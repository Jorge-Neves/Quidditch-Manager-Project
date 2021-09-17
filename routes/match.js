const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Charm = require("../models/Charm.model");
const weather = require("weather-js");



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


  
  router.get("/match", async(req, res) => {
    try {
      const studentToUpdate = req.params.studentId;
      const user = await User.findById(req.session.currentUser._id);
      if (user.students.length !== 3) {
          console.log("LIMIT")
        res.redirect("/match/error");
      } else {
        res.render("match/match")
          }
        } catch(e) {
            console.log("Student 3 players check failed", e)
          }
      });
      
      
  router.get("/match/error", (req, res) => {

        res.render("halls/halls-error");
  });
  
    //   router.get("/match-phase2", async (req, res) => {
        
    //     const chosenHouse = await House.findOne({sortedInto: true});
        
    //     res.render("match/match-update");
    // });

    router.get("/match/update-1-results", (req, res) => {
      res.render("match/match-update1-result")
      
    });

router.post("/match/update-1-results", async (req, res) => {

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



router.get("/match/match-win", async (req, res) => {
    res.render("match/match-win");
});

router.post("/match/match-win", async (req, res) => {
  try{
  const winTournament = await User.findOne({victories: 5})
  if(winTournament !== null){
    res.redirect("/match/match-champion")
    } else {
      res.redirect("/halls" )
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
      res.redirect("/halls")
    
    }
  }catch(e) {
    console.log("Lose function error", e)
}
});

//Final phase routes


router.get("/match/match-dark", (req, res) => {
    res.render("match/match-dark");
});

router.post("/match/match-dark", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  try{
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    console.log("incrementing")
    User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}})
      res.redirect("/match/match-win")
  
  
   }else{
      await User.findByIdAndUpdate(req.session.currentUser._id, {
        $inc: { losses: 1}
      })
      res.redirect("/match/match-lose")
  }
  }catch(e){
    console.log("Error dark arts check", e)
  }

});

router.get("/match/match-alchemy", (req, res) => {
    res.render("match/match-alchemy");
});

router.post("/match/match-alchemy", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);

  try{
  
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
      res.redirect("/match/match-win")

  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }

} catch(e){
  console.log("error alchemy", e)
}
});

router.get("/match/match-defense", (req, res) => {
    res.render("match/match-defense");
});

router.post("/match/match-defense", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  try{
 
  if(decisionNumber < 10){
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })

      res.redirect("/match/match-win")
    
  }else if (decisionNumber > 15){
    res.redirect("/match/golden-victory")
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }
} catch(e){
  console.log("Error defense check", e)
}
});

router.get("/match/match-transfiguration", (req, res) => {
    res.render("match/match-transfiguration");
});

router.post("/match/match-transfiguration", async (req, res) => {
  const decisionNumber = Math.floor(Math.random() * 20);
  try{
 
  if(decisionNumber < 10 || decisionNumber%5 ===0 ){
    console.log("incrementing")
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
    
    res.redirect("/match/match-win")
 
  }else{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { losses: 1}
    })
    res.redirect("/match/match-lose")
  }
}catch(e){
  console.log("error transfiguration", e)
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

router.get("/match/update-1", (req, res) => {
  const randomEvent = Math.floor(Math.random() * 5);
  let eventWeather = "";
  if(randomEvent === 1){
    eventWeather = "The rival team's captain is using an illegal broom. This cannot stand!"
  } else if(randomEvent === 2){
    eventWeather = "A rebellious student is casting spells at the players. Stop him"
  } else if(randomEvent === 3){
    eventWeather = "It looks some mischievious students are trying to pull out mandrakes. They must be stopped"
  } else if(randomEvent === 4){
    eventWeather = "A troll has invaded the field. Defend your students!"
  } else {
    eventWeather = "A rival teacher seems to be placing a curse on your players. This cannot stand!"
  }

  const citiesArray = ["Lisbon, Portugal", "Berlin, Germany", "Tokio, Japan", "London, United Kingdom", "Buenos Aires, Argentina", "Amsterdam, Netherlands", "Luxemburg, Belgium"]
        const randomCity = citiesArray[Math.floor(Math.random() * citiesArray.length)];


        const quotesArray = ["The elements favor Gryffindor, but hinder Slytherin", "The elements favor Hufflepuff, but hinder Ravenclaw", "The elements favor Slytherin, but hinder Gryffindor", "The elements favor Ravenclaw, but hinder Hufflepuff"];
        const randomNumber = Math.floor(Math.random() * quotesArray.length);
        const weatherResponse = quotesArray[randomNumber];
    
        // weather.find(
        //     { search: randomCity, degreeType: "C" },
        //     function (err, result) {
        //     if (err) console.log(err);
    
        //     console.log(JSON.stringify(result, null, 2));
        //     const temperature = result[0].current.temperature;
        //     const humidity = result[0].current.humidity;
        //     const skyState = result[0].current.skycode;
        //     console.log(temperature);
        //     console.log(humidity);
        //     console.log(skyState);

        //     let weatherResponse = "";

        //     if((temperature >= 25 && temperature <= 35) && (humidity >= 65 && humidity <= 70) && (skyState >= 10 && skyState <= 19)){
        //       // await House.findOneAndUpdate({name: "Gryffindor"}, {houseModifier: 5});
        //       // await House.findOneAndUpdate({name: "Slytherin"}, {houseModifier: -5});
    
        //       weatherResponse = "The element favor Gryffindor, but hinder Slytherin";
        //     }
        //     else if((temperature >= 20 && temperature <= 30) && (humidity >= 70 && humidity <= 75) && (skyState >= 30 && skyState <= 39)){
        //       // await House.findOneAndUpdate({name: "Hufflepuff"}, {houseModifier: 5});
        //       // await House.findOneAndUpdate({name: "Ravenclaw"}, {houseModifier: -5});
    
        //       weatherResponse = "The element favor Hufflepuff, but hinder Ravenclaw";
        //     }
        //     else if((temperature >= 15 && temperature <= 25) && (humidity >= 75 && humidity <= 80) && (skyState >= 40 && skyState <= 49)){
        //       // await House.findOneAndUpdate({name: "Slytherin"}, {houseModifier: 5});
        //       // await House.findOneAndUpdate({name: "Gryffindor"}, {houseModifier: -5});
    
        //       weatherResponse = "The element favor Slytherin, but hinder Gryffindor";
        //     }
        //     else if((temperature >= 10 && temperature <= 20) && (humidity >= 80 && humidity <= 85) && (skyState >= 20 && skyState <= 29)){
        //       // await House.findOneAndUpdate({name: "Ravenclaw"}, {houseModifier: 5});
        //       // await House.findOneAndUpdate({name: "Hufflepuff"}, {houseModifier: -5});
    
        //       weatherResponse = "The element favor Ravenclaw, but hinder Hufflepuff";
        //     }
        // });
        res.render("match/match-update1", {weatherResponse, eventWeather});
  
});



router.get("/match/golden-victory", async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $inc: { victories: 1}
    })
  res.render("match/match-golden")
  } catch(e){
    console("An error occured when trying to capture the golden snitch", e)
  }
});


module.exports = router;