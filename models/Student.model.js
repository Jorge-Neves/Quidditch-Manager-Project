const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  name: String,
  gender: {
    type: String,
    enum: ["female", "non binary", "male"],
  },
  house: String,
  darkArts: {
    type: Number,
  },
  defenseAgainstTheDarkArts: {
    type: Number,
  },
  transfiguration: {
    type: Number,
  },
  alchemy: {
    type: Number,
  },

  health: {
    type: Boolean,
  },
  choosen: {
    type: Boolean,
  },
});

const Student = model("Student", studentSchema);

module.exports = Student;
