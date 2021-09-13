const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");




router.get("/students", async (req, res) => {
    try{
    const students = await Student.find();

    res.render("students/students-list", {students});
    } catch(e){
        console.log("error", e)
    }
});

router.get("/students/update", (req, res) => {
   
    res.render("students/students-update");
   
   
});




router.get("/students/create", async (req, res) => {
    res.render("students/students-create")
});

router.post("/students/create", async (req, res) => {
        try{
        const { name, description } = req.body;
        await Student.create({ name, description });
        res.redirect("/students");
            } catch(e){
                console.log("error", e)
            }
       
    });


router.post("/students/create", async (req, res) => {

    const { name, description } = req.body;
try{
    await Student.create({ name, description });
    res.redirect("/houses/houses-create");
} catch(e){
    console.log("error", e)
}
  
});

router.get("/students/:studentId", async (req, res) => {
    try{
    const studentId = await Student.findById(req.params.studentId)
    res.render("students/students-details", studentId)
} catch(e){
    console.log("error", e)
}
});


router.get("/students/:studentId/edit", async (req, res) => {
    try{
    const students = await Student.findById(req.params.studentId)
    res.render("students/students-edit", students);
} catch(e){
    console.log("error", e)
}
});

router.post("/students/:studentId/edit", async (req, res) => {
    const { name, description} = req.body;
    try{
     await Student.findByIdAndUpdate(req.params.studentId, {
       name, description
    });
    res.redirect(`/students/${req.params.studentId}`);
} catch(e){
    console.log("error", e)
}
});



router.post("/students/:studentId/add", async (req, res) => {
     const studentToUpdate =  req.params.studentId
    try{
     await Student.findById({studentToUpdate}, { choosen: true}  );
    res.redirect("/students/:studentId");
} catch(e){
    console.log("error", e)
}
});


module.exports = router;

