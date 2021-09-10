const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");




router.get("/houses", async (req, res) => {
    try{
    const houses = await House.find();

    res.render("houses/houses-list", {houses});
    } catch(e){
        console.log("error", e)
    }
});






router.get("/houses/create", async (req, res) => {
    res.render("houses/houses-create")
});

router.post("/houses/create", async (req, res) => {
        try{
        const { name, description } = req.body;
        await House.create({ name, description });
        res.redirect("/houses");
            } catch(e){
                console.log("error", e)
            }
       
    });



router.get("/houses/:houseId", async (req, res) => {
    try{
    const houseId = await House.findById(req.params.houseId)
    res.render("houses/houses-details", houseId)
} catch(e){
    console.log("error", e)
}
});


router.get("/houses/:houseId/edit", async (req, res) => {
    try{
    const houses = await House.findById(req.params.houseId)
    res.render("houses/houses-edit", houses);
} catch(e){
    console.log("error", e)
}
});

router.post("/houses/:houseId/edit", async (req, res) => {
    const { name, description} = req.body;
    try{
     await House.findByIdAndUpdate(req.params.houseId, {
       name, description
    });
    res.redirect(`/houses/${req.params.houseId}`);
} catch(e){
    console.log("error", e)
}
});



router.post("/houses/:houseId/delete", async (req, res) => {
    try{
     await House.findByIdAndRemove(req.params.houseId);
    res.redirect("/houses/");
} catch(e){
    console.log("error", e)
}
});


module.exports = router;

