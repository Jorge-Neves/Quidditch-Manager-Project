const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");
// const Teacher = require("../models/Teacher.model.js");
const Tournament = require("../Deprecated/tournament.model");


router.get("/tournaments", async (req, res) => {
      Tournament.find().then((tournaments) => {
        console.log("got weather");
        res.render("tournaments/tournaments-list", { tournaments });
      });
});

router.get("/tournaments/update", (req, res) => {
  res.render("tournaments/tournaments-update");
});

router.post("/tournaments/:tournamentId/delete", async (req, res) => {
  try {
    await Tournament.findByIdAndRemove(req.params.tournamentId);
    res.redirect("/tournaments/");
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
