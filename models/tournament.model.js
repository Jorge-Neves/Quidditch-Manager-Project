const { Schema, model } = require("mongoose");


const tournamentSchema = new Schema({
      name: String,
      description: String,
   


  
});

const Tournament = model("Tournament", houseSchema);

module.exports = Tournament;