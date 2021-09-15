const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: String,
  // recoveryQuestion: String,
  victories: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  teamLimit: {
    type: Boolean,
    default: false,
  }, 
  students : Array     
});

const User = model("User", userSchema);

module.exports = User;
