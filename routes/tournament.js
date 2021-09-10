const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");
const Tournament = require("../models/tournament.model");




router.get("/tournaments", async (req, res) => {
    try{
    const tournaments = await Tournament.find();

    res.render("tournaments/tournaments-list", {tournaments});
    } catch(e){
        console.log("error", e)
    }
});


router.get("/tournaments/update", (req, res) => {
   
    res.render("tournaments/tournaments-update");
   
   
});



router.get("/tournaments/create", async (req, res) => {
    res.render("tournaments/tournaments-create")
});

router.post("/tournaments/create", async (req, res) => {
        try{
        const { name, description } = req.body;
        await Tournament.create({ name, description });
        res.redirect("/tournaments");
            } catch(e){
                console.log("error", e)
            }
       
    });


router.post("/tournaments/create", async (req, res) => {

    const { name, description } = req.body;
try{
    await Tournament.create({ name, description });
    res.redirect("/tournaments/tournaments-create");
} catch(e){
    console.log("error", e)
}
  
});

router.get("/tournaments/:tournamentId", async (req, res) => {
    try{
    const torunamentId = await Tournament.findById(req.params.tournamentId)
    res.render("tournaments/tournaments-details", tournamentId)
} catch(e){
    console.log("error", e)
}
});


router.get("/tournaments/:tournamentId/edit", async (req, res) => {
    try{
    const tournamnets = await Tournament.findById(req.params.torunamentId)
    res.render("tournaments/tournaments-edit", tournaments);
} catch(e){
    console.log("error", e)
}
});

router.post("/tournaments/:tournamentId/edit", async (req, res) => {
    const { name, description} = req.body;
    try{
     await Tournament.findByIdAndUpdate(req.params.tournamentId, {
       name, description
    });
    res.redirect(`/tournamnets/${req.params.tournamentId}`);
} catch(e){
    console.log("error", e)
}
});



router.post("/tournaments/:tournamentId/delete", async (req, res) => {
    try{
     await Tournament.findByIdAndRemove(req.params.tournamentId);
    res.redirect("/tournaments/");
} catch(e){
    console.log("error", e)
}
});


module.exports = router;

