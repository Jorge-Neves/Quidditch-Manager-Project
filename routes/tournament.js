const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");
// const Teacher = require("../models/Teacher.model.js");
const Tournament = require("../Deprecated/tournament.model");


router.get("/tournaments", async (req, res) => {
  let user5 = req.session.currentUser;
  let currentUser = await User.findById(user5._id)
  res.render("tournaments/tournaments-list", currentUser);
});

router.get("/tournaments/update", (req, res) => {
  res.render("tournaments/tournaments-update");
});


module.exports = router;
