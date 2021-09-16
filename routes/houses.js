const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");






router.get("/houses/", async (req, res) => {
    try{
    const houses = await House.findOne({ sortedInto:true });

    res.render("houses/houses-list", houses);
    } catch(e){
        console.log("error", e)
    }
});


router.get("/houses/update", (req, res) => {
   
    res.render("houses/houses-update");
   
   
});



router.get("/houses/:houseId", async (req, res) => {
    try{
    const houseId = await House.findById(req.params.houseId)
    res.render("houses/houses-details", houseId)
} catch(e){
    console.log("error", e)
}
});


module.exports = router;

