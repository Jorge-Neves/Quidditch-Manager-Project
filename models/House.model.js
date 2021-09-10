const { Schema, model } = require("mongoose");


const houseSchema = new Schema({
      name: String,
      element: String,
      // modifiers:{},
      //values:[],
      description: String,
});

const House = model("House", houseSchema);

module.exports = House;