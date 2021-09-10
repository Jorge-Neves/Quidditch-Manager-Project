const router = require("express").Router();
const User = require("../models/User.model");
const House = require("../models/House.model.js");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model.js");
const Teacher = require("../models/Teacher.model.js");
const Tournament = require("../models/tournament.model");
const weather = require("weather-js");



// function winGuessFormula(temperature) {
    
// }

const citiesArray = ["Lisbon, Portugal", "Berlin, Germany", "Tokio, Japan", "London, United Kingdom", "Buenos Aires, Argentina"]
const randomCity = citiesArray[Math.floor(Math.random() * (citiesArray.length - 1))];

weather.find(
{ search: randomCity, degreeType: "C" },
function (err, result) {
    if (err) console.log(err);

    console.log(JSON.stringify(result, null, 2));

    const temperature = result[0].current.temperature;
    const humidity = result[0].current.humidity;
    const skyState = result[0].current.skycode;
    console.log(temperature);
});


module.exports = router;