const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
// const Teacher = require("../models/Teacher.model.js");
const weather = require("weather-js");


async function weatherInfluence(temperature, humidity, skyState){
    const houses = await House.find();
    houses.forEach(async (house) => {
      if((temperature >= 25 && temperature <= 35) && (humidity >= 65 && humidity <= 70) && (skyState >= 10 && skyState <= 19) && house.name === "Gryffindor"){
        await House.findOneAndUpdate({name: "Gryffindor"}, {alchemyFail: true});
      }
      else if((temperature >= 20 && temperature <= 30) && (humidity >= 70 && humidity <= 75) && (skyState >= 30 && skyState <= 39) && house.name === "Hufflepuff"){
        await House.findOneAndUpdate({name: "Hufflepuff"}, {alchemyFail: true});
      }
      else if((temperature >= 15 && temperature <= 25) && (humidity >= 75 && humidity <= 80) && (skyState >= 40 && skyState <= 49) && house.name === "Slytherin"){
        await House.findOneAndUpdate({name: "Slytherin"}, {alchemyFail: true});
      }
      else if((temperature >= 10 && temperature <= 20) && (humidity >= 80 && humidity <= 85) && (skyState >= 20 && skyState <= 29) && house.name === "Ravenclaw"){
        await House.findOneAndUpdate({name: "Ravenclaw"}, {alchemyFail: true});
      }
    });
  }


router.get("/dashboard", (req, res) => {
    res.render("dashboard/dashboard-landing");
});


router.get("/dashboard/sorting", async (req, res) => {
    res.render("dashboard/dashboard-sorting")
});

router.get("/dashboard/sorting-result", async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 4);
    const houses = await House.find();
    const choosenHouse = houses[randomNumber];
    await House.findOneAndUpdate({name: choosenHouse.name}, {sortedInto: true});
    res.render("dashboard/dashboard-sorting-result", choosenHouse);
});

router.get("/dashboard/match", (req, res) => {
    res.render("dashboard/match");
});

router.get("/dashboard/match/test", async (req, res) => {

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
      console.log("Dark magic worked test")
      
    } else if (defense > dark && defense > trans && defense > alch) {
      console.log("Defense worked test")
     
    } else if (trans > dark && trans > defense && trans > alch) {
      console.log("morphing magic worked test")
      
    } else {
      console.log("potions worked test")
      
    }  
  
  res.redirect("/dashboard/match");
});


router.get("/dashboard/match-update", async (req, res) => {
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
    res.render("dashboard/match-update");
});


module.exports = router;

// if (hat === 1) {
//   try {
//     await House.findOneAndUpdate({ name: gryffindor }, { choosen: true });
//     res.redirect("/dashboard");
//   } catch (e) {
//     console.log(
//       "it seems the halls have had trouble sorting you pls contact the faculty"
//     );
//     alert(
//       "it seems as if the halls have had trouble sorting you pls contact the faculty"
//     );
//     res.redirect("/");
//   }
// } else if (hat === 2) {
//   try {
//     await House.findOneAndUpdate({ name: hufflepuff }, { choosen: true });
//     res.redirect("/dashboard");
//   } catch (e) {
//     console.log(
//       "it seems the halls have had trouble sorting you pls contact the faculty"
//     );
//     alert(
//       "it seems as if the halls have had trouble sorting you pls contact the faculty"
//     );
//     res.redirect("/");
//   }
// } else if (hat === 3) {
//   try {
//     await House.findOneAndUpdate({ name: ravenclaw }, { choosen: true });
//     res.redirect("/dashboard");
//   } catch (e) {
//     console.log(
//       "it seems the halls have had trouble sorting you pls contact the faculty"
//     );
//     alert(
//       "it seems as if the halls have had trouble sorting you pls contact the faculty"
//     );
//     res.redirect("/");
//   }
// } else {
//   try {
//     await House.findOneAndUpdate({ name: slytherin }, { choosen: true });
//     res.redirect("/dashboard");
//   } catch (e) {
//     console.log(
//       "it seems the halls have had trouble sorting you pls contact the faculty"
//     );
//     alert(
//       "it seems as if the halls have had trouble sorting you pls contact the faculty"
//     );
//     res.redirect("/");
//   }
// }