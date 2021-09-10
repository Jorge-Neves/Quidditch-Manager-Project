const { Schema, model } = require("mongoose");


const houseSchema = new Schema({
      name: String,
      description: String,

  
});

const House = model("House", houseSchema);

module.exports = House;