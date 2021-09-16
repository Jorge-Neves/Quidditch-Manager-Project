const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");
const weather = require("weather-js");



router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard-landing");
});


router.get("/dashboard/sorting", async (req, res) => {
    res.render("dashboard/dashboard-sorting")
});

router.get("/dashboard/sorting-result", async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 4);
    try{
    const houses = await House.find();
    const choosenHouse = houses[randomNumber];
    await House.findOneAndUpdate({name: choosenHouse.name}, {sortedInto: true});
    res.render("dashboard/dashboard-sorting-result", choosenHouse);
    } catch(e) {
      console.log("error",e)
    }
});

// router.get("/dashboard/spell", (req, res) => {  
//   res.render("dashboard/dashboard-spell");
// });

// router.post("/dashboard/spell", async (req, res) => {
//   const randomNumber = Math.floor(Math.random() * 4);
//   try{
//   const houses = await House.find();
//   const choosenHouse = houses[randomNumber];
//   await House.findOneAndUpdate({name: choosenHouse.name}, {sortedInto: true});
//   res.redirect("/dashboard");
//   else
//   res.render("dashboard/dashboard-spell", {WrongSpell});
//   } catch(e) {
//     console.log("error",e)
//   }
// });

module.exports = router;
