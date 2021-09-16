const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../Deprecated/Team.model.js");
const weather = require("weather-js");


function winFormula(teamAverage){
    const decisionNumber = Math.floor(Math.random() * 20);
    if(decisionNumber > teamAverage){
      return false;
    }else{
      return true;
    }
  }


async function weatherInfluence(temperature, humidity, skyState){
    const houses = await House.find();
    houses.forEach(async (house) => {
      if((temperature >= 25 && temperature <= 35) && (humidity >= 65 && humidity <= 70) && (skyState >= 10 && skyState <= 19) && house.name === "Gryffindor"){
        await House.findOneAndUpdate({name: "Gryffindor"}, {houseModifier: 5});
        await House.findOneAndUpdate({name: "Slytherin"}, {houseModifier: -5});
      }
      else if((temperature >= 20 && temperature <= 30) && (humidity >= 70 && humidity <= 75) && (skyState >= 30 && skyState <= 39) && house.name === "Hufflepuff"){
        await House.findOneAndUpdate({name: "Hufflepuff"}, {houseModifier: 5});
        await House.findOneAndUpdate({name: "Ravenclaw"}, {houseModifier: -5});
      }
      else if((temperature >= 15 && temperature <= 25) && (humidity >= 75 && humidity <= 80) && (skyState >= 40 && skyState <= 49) && house.name === "Slytherin"){
        await House.findOneAndUpdate({name: "Slytherin"}, {houseModifier: 5});
        await House.findOneAndUpdate({name: "Gryffindor"}, {houseModifier: -5});
      }
      else if((temperature >= 10 && temperature <= 20) && (humidity >= 80 && humidity <= 85) && (skyState >= 20 && skyState <= 29) && house.name === "Ravenclaw"){
        await House.findOneAndUpdate({name: "Ravenclaw"}, {houseModifier: 5});
        await House.findOneAndUpdate({name: "Hufflepuff"}, {houseModifier: -5});
      }
    });
  }

  router.get("/match", (req, res) => {
    res.render("match/match");
});


router.post("/match", async (req, res) => {

    async function studentsAvg(grade) {
  
      try {
        const team = await Student.find({choosen: true});
        const teamStats = team.map((obj) => obj[grade]);
    
        let avg = teamStats.reduce((a, b) => a + b) / teamStats.length;
    
        return avg;
      } catch (e) {
        console.log(
          "An error ocurred when calculating the stat dark arts average"
        );
      }
    }
    
  
      let dark = await studentsAvg("darkArts");
      let defense = await studentsAvg("defenseAgainstTheDarkArts");
      let trans = await studentsAvg("transfiguration");
      let alch = await studentsAvg("alchemy");
  
    
      if (dark > defense && dark > trans && dark > alch) {
        console.log("Dark magic worked test");
        res.redirect("/match/match-dark");
        
      } else if (defense > dark && defense > trans && defense > alch) {
        console.log("Defense worked test");
        res.redirect("/match/match-defense");
       
      } else if (trans > dark && trans > defense && trans > alch) {
        console.log("morphing magic worked test");
        res.redirect("/match/match-transfiguration");
        
      } else {
        console.log("potions worked test");
        res.redirect("/match/match-alchemy");
        
      }  
    
    res.redirect("/match");
  });


router.get("/match-update", async (req, res) => {
    const citiesArray = ["Lisbon, Portugal", "Berlin, Germany", "Tokio, Japan", "London, United Kingdom", "Buenos Aires, Argentina", "Amsterdam, Netherlands", "Luxemburg, Belgium"]
    const randomCity = citiesArray[Math.floor(Math.random() * citiesArray.length)];

    weather.find(
        { search: randomCity, degreeType: "C" },
        function (err, result) {
        if (err) console.log(err);

        console.log(JSON.stringify(result, null, 2));
        const temperature = result[0].current.temperature;
        const humidity = result[0].current.humidity;
        const skyState = result[0].current.skycode;
        console.log(temperature);
        console.log(humidity);
        console.log(skyState);
        weatherInfluence(temperature, humidity, skyState);
    });

    const chosenHouse = await House.findOne({sortedInto: true});
    
    res.render("match/match-update");
});

router.get("/match/match-win", async (req, res) => {
    res.render("match/match-win");
});

router.post("/match/match-win", async (req, res) => {
  try{
  const winTournament = await User.findOne({victories: 5})
  if(winTournament !== null){
    res.redirect("/match/match-champion")
    } else {
      res.redirect("/dashboard" )
}
  } catch(e) {
    console.log("Win function error", e)
  }
});


router.get("/match/match-lose", async (req, res) => {
    res.render("match/match-lose");
});

router.post("/match/match-lose", async (req, res) => {
  try{
  const winTournament = await User.findOne({losses: 5})
  if(winTournament !== null){
    res.redirect("/match/match-eliminated")
    } else {
      res.redirect("/dashboard")
    
    }
  }catch(e) {
    console.log("Lose function error", e)
}
});

router.get("/match/match-dark", (req, res) => {
    res.render("match/match-dark");
});

router.post("/match/match-dark", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  const winTournament = await User.findOne(req.session.currentUser._id, {victories: 5})
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    console.log("incrementing")
    User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
    if(winTournament < 5){
      res.redirect("/match/match-win")
      } else {
        res.redirect("/match/match-champion")
      }
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}})
    res.redirect("/match/match-lose")
  }
});

router.get("/match/match-alchemy", (req, res) => {
    res.render("match/match-alchemy");
});

router.post("/match/match-alchemy", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  const winTournament = await User.findOne(req.session.currentUser._id, {victories: 5})
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
    if(winTournament !== null){
      res.redirect("/match/match-win")
      } else {
        res.redirect("/match/match-champion")
      }
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }
});

router.get("/match/match-defense", (req, res) => {
    res.render("match/match-defense");
});

router.post("/match/match-defense", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
    if(winTournament !== null){
      res.redirect("/match/match-win")
      } else {
        res.redirect("/match/match-champion")
      }
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }
});

router.get("/match/match-transfiguration", (req, res) => {
    res.render("match/match-transfiguration");
});

router.post("/match/match-transfiguration", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  const winTournament = req.session.currentUser.victories
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
    if(winTournament !== null){
    res.redirect("/match/match-win")
    } else {
      res.redirect("/match/match-champion")
    }
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }
});

router.get("/match/match-champion", (req, res) => {
  res.render("match/match-champion")
});


router.get("/match/match-eliminated", (req, res) => {
  res.render("match/match-eliminated")
});

router.post("/finish", async (req, res) => {
  const studentToUpdate = req.params.studentId;
  try{
  const user = await User.findById(req.session.currentUser._id)
  await Student.findByIdAndDelete(user)
  await House.updateMany({sortedInto: true}, {sortedInto: false});
  await Student.updateMany({choosen: true}, {choosen: false});
  req.session.destroy();
  res.redirect("/");
  } catch(e) {
      console.log("There was an error while finishing the account", e)        
  };
});


module.exports = router;