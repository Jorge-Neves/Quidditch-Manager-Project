const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const weather = require("weather-js");



router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard-landing");
});


router.get("/dashboard/sorting", async (req, res) => {
    res.render("dashboard/dashboard-sorting")
});

router.get("/dashboard/sorting-result", async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 4);
    const houses = await House.find();
    const choosenHouse = houses[randomNumber];
    await House.findOneAndUpdate({name: choosenHouse.name}, {sortedInto: true});
    res.render("dashboard/dashboard-sorting-result", choosenHouse);
});



module.exports = router;
