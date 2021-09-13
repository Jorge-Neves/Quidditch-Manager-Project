const { Schema, model } = require("mongoose");


const studentSchema = new Schema({
      name: String,
      gender: {
          type: String,
          enum: ["female", "non binary", "male"],
      },
      house: String,
      patronus: String,
      yearOfBirth: Number,
      darkArts: {
          Type: Number,
          default: 0,
        },
        darkArts: {
            Type: Number,
            default: 0,
          },
        defenseAgainstTheDarkArts: {
            Type: Number,
            default: 0,
          },
        transfiguration: {
            Type: Number,
            default: 0,
          },
        alchemy: {
            Type: Number,
            default: 0,
          },

        health: {
            type: Boolean,
            default: true,

        },
        choosen: {
            type: Boolean,
            default: false,
        },


      image: String,
  
});

const Student = model("Student", studentSchema);

module.exports = Student;