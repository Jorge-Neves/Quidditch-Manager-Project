const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");


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
    res.redirect("/");
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
        res.redirect("/")
    } else {
        res.render("auth/login", {errorMessage:"Invalid login"})
    }

    });


    router.post("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/");
    });
    



module.exports = router;
