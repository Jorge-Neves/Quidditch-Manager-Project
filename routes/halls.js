const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const weather = require("weather-js");



router.get("/halls", async (req, res) => {


        
  // await House.findOneAndUpdate({name: user.House}, {sortedInto: true})
try{
    const user = req.session.currentUser
    const chosenHouse = await User.findById(user._id)
    let houseRoomImage = "";
    if(chosenHouse.House === "Gryffindor"){
        houseRoomImage = "/images/Gryffindor_common_room.jpg"
    }else if(chosenHouse.House === "Slytherin"){
        houseRoomImage = "/images/slyth_common_room.jpg";
    }else if(chosenHouse.House === "Hufflepuff"){
        houseRoomImage = "/images/HufflepuffCommonroom_PM_.jpg";
    }else if(chosenHouse.House === "Ravenclaw"){
        houseRoomImage = "/images/Ravenclaw_common_room.png";
    }
    res.render("halls/halls-landing", {houseRoomImage});
  
}catch(e) {
    console.log("An error occured whilst rendering the halls", e)
  }

  });


// router.get("/dashboard", async (req, res) => {
//   const user = await User.findById(req.session.currentUser._id)
//   const chosenHouse = await House.findOne({sortedInto: true});
//   let houseRoomImage = "";
//   if(chosenHouse.name === "Gryffindor"){
//       houseRoomImage = "/images/Gryffindor_common_room.jpg"
//   }else if(chosenHouse.name === "Slytherin"){
//       houseRoomImage = "/images/slyth_common_room.jpg";
//   }else if(chosenHouse.name === "Hufflepuff"){
//       houseRoomImage = "/images/HufflepuffCommonroom_PM_.jpg";
//   }else if(chosenHouse.name === "Ravenclaw"){
//       houseRoomImage = "/images/Ravenclaw_common_room.png";
//   }
//   res.render("dashboard/dashboard-landing", {houseRoomImage});
// });


router.get("/halls/sorting", async (req, res) => {
    res.render("halls/halls-sorting")
});

router.get("/halls/sorting-result", async (req, res) => {
    // const randomNumber = Math.floor(Math.random() * 4);
    
    try{
    //   const user = req.session.currentUser
    // const chosenHouse = await User.findById(user._id)
    const user2 = req.session.currentUser
    const chosenHouse = await User.findById(user2._id)
    let houseRoomImage = "";
    if(chosenHouse.House === "Gryffindor"){
        houseRoomImage = "Gryffindor";
    }else if(chosenHouse.House === "Slytherin"){
        houseRoomImage = "Slytherin";
    }else if(chosenHouse.House === "Hufflepuff"){
        houseRoomImage = "Hufflepuff";
    }else if(chosenHouse.House === "Ravenclaw"){
        houseRoomImage = "Ravenclaw";
    }
    // const houses = await House.find();
    // let choosenHouse = "";
    // choosenHouse = houseUserCheck.House;
    // await House.findOneAndUpdate({name: choosenHouse.name}, {sortedInto: true});
    // await User.findByIdAndUpdate(user,{House: choosenHouse.name })
    res.render("halls/halls-sorting-result", {houseRoomImage});
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
