require("../db");
const axios = require("axios");
const House = require("../models/House.model");
const houses = [
  {
    name: "Gryffindor",
    commonRoom: "Gryffindor Tower",
    darkArtsMod: 0,
    defenseAgainstTheDarkArtsMod: 0,
    transfigurationMod: 0,
    alchemyMod: 0,
    darkArtsFail: false,
    defenseArtsFail: false,
    transfigurationFail: false,
    alchemyFaail: false,
    values: "-brave, though sometimes to the point of recklessness.-",
    sortedInto: false,
    isAStudent: false,
    isAHouse: true,
  },
  {
    name: "Hufflepuff",
    commonRoom: "Hufflepuff Basement",
    darkArtsMod: 0,
    defenseAgainstTheDarkArtsMod: 0,
    transfigurationMod: 0,
    alchemyMod: 0,
    darkArtsFail: false,
    defenseArtsFail: false,
    transfigurationFail: false,
    alchemyFaail: false,
    values: "-hard-working, friendly, loyal, honest and rather impartial-",
    sortedInto: false,
    isAStudent: false,
    isAHouse: true,
  },
  {
    name: "Ravenclaw",
    commonRoom: "Ravenclaw Tower",
    darkArtsMod: 0,
    defenseAgainstTheDarkArtsMod: 0,
    transfigurationMod: 0,
    alchemyMod: 0,
    darkArtsFail: false,
    defenseArtsFail: false,
    transfigurationFail: false,
    alchemyFaail: false,
    values:
      "-ambitious, shrewd, cunning, strong leaders, and achievement-oriented-",
    sortedInto: false,
    isAStudent: false,
    isAHouse: true,
  },
  {
    name: "Slytherin",
    commonRoom: "Slytherin Dungeon",
    darkArtsMod: 0,
    defenseAgainstTheDarkArtsMod: 0,
    transfigurationMod: 0,
    alchemyMod: 0,
    darkArtsFail: false,
    defenseArtsFail: false,
    transfigurationFail: false,
    alchemyFaail: false,
    values:
      "-ambitious, shrewd, cunning, strong leaders, and achievement-oriented-",
    sortedInto: false,
    isAStudent: false,
    isAHouse: true,
  },
];

House.insertMany(houses).then((housesFromDB) => {
  console.log(`houses created - ${housesFromDB.length}`);
});
