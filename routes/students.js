const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");
// const Teacher = require("../Deprecated/Teacher.model.js");

router.get("/students", async (req, res) => {
  try {
    const house = await House.findOne({ sortedInto: true });
    const houseName = house.name;
    const students = await Student.find({ house: houseName });

    res.render("students/students-list", { students });
  } catch (e) {
    console.log("error", e);
  }
});

router.get("/students/team", async (req, res) => {
  try {
    const team = await Student.find({ choosen: true });

    res.render("students/students-team", { team });
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
  try {
    const studentToUpdate = req.params.studentId;
    const user = await User.findById(req.session.currentUser._id);
    /* console.log(user.students);
    console.log(user.students.length); */
    if (user.students.length >= 3) {
        console.log("LIMIT")
      res.render("students/students-list", {
        errorMessage: "You have reached the limit",
      });
    } else {
      await Student.findByIdAndUpdate(studentToUpdate, { choosen: true });
      await User.findByIdAndUpdate(req.session.currentUser._id, {
        $push: {
          students: studentToUpdate,
        },
    });
    console.log("Student added")
    res.redirect(`/students/${studentToUpdate}`);
}

  } catch (e) {
    console.log("error", e);
  }
});

router.post("/students/:studentId/remove", async (req, res) => {
  const id = req.params.studentId;
  try {
    await Student.findByIdAndUpdate(id, { choosen: false });
    await User.findByIdAndUpdate(req.session.currentUser._id, {
        $pop: {
          students: 1,
        },
    });
    console.log("Student removed")
    res.redirect(`/students/${id}`);
  } catch (e) {
    console.log("error", e);
  }
});

module.exports = router;
