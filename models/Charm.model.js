const { Schema, model } = require("mongoose");

const charmSchema = new Schema({
  name: String,
  cursed: {
    type: Boolean,
    default: false,
  },
  charmed: {
    type: Boolean,
    default: false,
  }
});

const Charm = model("Charm", charmSchema);

module.exports = Charm;
