const { Schema, model } = require("mongoose");


const teamSchema = new Schema({
      name: String,
      description: String,
   


  
});

const Team = model("Team", teamSchema);

module.exports = Team;