const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");
const Tournament = require("../models/tournament.model");
const weather = require("weather-js");

function winGuessFormula(temperature) {
  return "Win";
}

router.get("/tournaments", async (req, res) => {
    const citiesArray = ["Lisbon, Portugal", "Berlin, Germany", "Tokio, Japan", "London, United Kingdom", "Buenos Aires, Argentina"]
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
      const winner = winGuessFormula(temperature)
      Tournament.find().then((tournaments) => {
        console.log("got weather");
        res.render("tournaments/tournaments-list", { tournaments });
      });
    }
  );
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
