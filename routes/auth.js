const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student.model");
const House = require("../models/House.model")


router.get("/signup", (req, res) => {
    res.render("auth/signup");
})

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    //longer simpler way of doint the line above
    //const username = req.body.username
    //const password = req.body.password
    //The line above auto creates an object with those two variables
if (username === "" || password === ""){
    res.render("auth/signup", { errorMessage: "Fill username and Password"})
    return;
    //we return so the execution stops here
    //This makes the username have to fill out both fields
}
    const user = await User.findOne({ username });
    if (user !== null) {
        //found a user that has the same name
        // it cant be written like this cause otherwise we get an array of user const user = await User.find({ username });
        res.render("auth/signup", { errorMessage: "User already exists"});
        return;
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt); 
    try{
    await User.create({
        username,  //short hand notation when you have the same key and value you can skip it
        password: hashedPassword,
    });
    res.redirect("/dashboard/sorting");
   } catch(e) {
       console.log("error", e)
   }
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});



router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (username === "" || password === ""){
        res.render("auth/login", { errorMessage: "Fill username and Password"})
        return;
    }

    const user = await User.findOne({ username });
    if (user === null) {
        //found a user that has the same name
        // it cant be written like this cause otherwise we get an array of user const user = await User.find({ username });
        res.render("auth/login", { errorMessage: "Invalid login"});
        //user doesnot exist is not good cybersecurity practices cause it gives hints to possibly nefarious agents
        return;
    }

    if (bcrypt.compareSync(password, user.password)) {
        //passwords match = login successful
        req.session.currentUser = user;
        //object is an object that becomes available after what we set up in app.js
        //this allows for multiple people logged in at the same time
        await House.findOneAndUpdate({name: user.House}, {sortedInto: true})
        res.redirect("/dashboard")
    } else {
        res.render("auth/login", {errorMessage:"Invalid login"})
    }

    });

    router.post("/logout", async (req, res) => {
        const studentToUpdate = req.params.studentId;
        try{
        await User.findByIdAndUpdate(req.session.currentUser._id, { $set: {"students": []}})
        await User.findByIdAndUpdate(req.session.currentUser._id, { teamLimit: false})
        await User.findByIdAndUpdate(req.session.currentUser._id, { secretSpellCheck: false});
        await House.updateMany({sortedInto: true}, {sortedInto: false});
        await Student.updateMany({choosen: true}, {choosen: false});
        req.session.destroy();
        res.redirect("/");
        } catch(e) {
            console.log("there was an error with the logout request", e)
        }
});
    

    // router.get("/auth/recovery", (req, res) => {
    //     res.render("auth/password-recovery");
    // });

    // router.post("/auth/recovery", async (req, res) => {
    //     const { username, recoveryQuestion } = req.body;
        
    //     if (username === "" || recoveryQuestion === ""){
    //         res.render("auth/login", { errorMessage: "Fill username and Recovery Question"})
    //         return;
    //     }
    
    //     const user = await User.findOne({ username });
    //     if (user === null) {
    //         //found a user that has the same name
    //         // it cant be written like this cause otherwise we get an array of user const user = await User.find({ username });
    //         res.render("auth/login", { errorMessage: "Invalid login"});
    //         //user doesnot exist is not good cybersecurity practices cause it gives hints to possibly nefarious agents
    //         return;
    //     }
    
    //     if (bcrypt.compareSync(recoveryQuestion, user.recoveryQuestion)) {
    //         req.session.currentUser = user;
    //         res.redirect("/dashboard")
    //     } else {
    //         res.render("auth/recovery", {errorMessage:"Invalid username or recovery question answer"})
    //     }
    
    //     });


    router.post("/logout", async (req, res) => {
        const studentToUpdate = req.params.studentId;
        try{
        await User.findByIdAndUpdate(req.session.currentUser._id, { $set: {"students": []}})
        await User.findByIdAndUpdate(req.session.currentUser._id, { teamLimit: false})
        await User.findByIdAndUpdate(req.session.currentUser._id, { secretSpellCheck: false});
        await House.updateMany({sortedInto: true}, {sortedInto: false});
        await Student.updateMany({choosen: true}, {choosen: false});
        req.session.destroy();
        res.redirect("/");
        } catch(e) {
            console.log("there was an error with the logout request", e)
        }
});
    
    router.post("/finish", async (req, res) => {
        const studentToUpdate = req.params.studentId;
        try{
        const user = await User.findById(req.session.currentUser._id)
        await Student.findByIdAndDelete(user)
        await House.updateMany({sortedInto: true}, {sortedInto: false});
        await Student.updateMany({choosen: true}, {choosen: false});
        req.session.destroy();
        res.redirect("/");
        } catch(e) {
            console.log("There was an error while finishing the account", e)        
        };
    });


module.exports = router;
