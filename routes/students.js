const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
// const Teacher = require("../Deprecated/Teacher.model.js");

router.get("/students", async (req, res) => {
  try {

    const students = await Student.find({ choosen: true });

    res.render("students/students-list", { students });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/students/update", (req, res) => {
  res.render("students/students-update");
});

router.get("/students/create", async (req, res) => {
  res.render("students/students-create");
});

router.post("/students/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    await Student.create({ name, description });
    res.redirect("/students");
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/students/create", async (req, res) => {
  const { name, description } = req.body;
  try {
    await Student.create({ name, description });
    res.redirect("/houses/houses-create");
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/students/:studentId", async (req, res) => {
  try {
    const studentId = await Student.findById(req.params.studentId);
    res.render("students/students-details", studentId);
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/students/:studentId/edit", async (req, res) => {
  try {
    const students = await Student.findById(req.params.studentId);
    res.render("students/students-edit", students);
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/students/:studentId/edit", async (req, res) => {
  const { name, description } = req.body;
  try {
    await Student.findByIdAndUpdate(req.params.studentId, {
      name,
      description,
    });
    res.redirect(`/students/${req.params.studentId}`);
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/students/:studentId/add", async (req, res) => {
  const studentToUpdate = req.params.studentId;
  try {
    await Student.findByIdAndUpdate(studentToUpdate, { choosen: true });
    res.redirect(`/students/${studentToUpdate}`);
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/students/:studentId/remove", async (req, res) => {
  const id = req.params.studentId;
  try {
    await Student.findByIdAndUpdate(id, { choosen: false });
    res.redirect(`/students/${id}`);
  } catch (e) {
    console.log("error", e);
  }
});


function studentsAvgDarkArts(teamArray) {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.darkArts);

  let avg = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg;
}

function studentsAvgDefenseArts(teamArray) {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.defenseAgainstTheDarkArts);

  let avg = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg;
}

function studentsAvgTransfiguration(teamArray) {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.transfiguration);

  let avg = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg;
}

function studentsAvgAlchemy(teamArray) {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.alchemy);

  let avg = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg;
}

module.exports = router;
