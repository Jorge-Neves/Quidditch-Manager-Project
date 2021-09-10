const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");




router.get("/dashboard", (req, res) => {
    

    res.render("dashboard/dashboard-landing");
  
});


router.get("/dashboard/sorting", async (req, res) => {
    res.render("dashboard/dashboard-sorting")
});

router.get("/dashboard/match", (req, res) => {
    

    res.render("dashboard/match");
  
});


router.get("/dashboard/match-update", async (req, res) => {
    res.render("dashboard/match-update")
});


module.exports = router;

