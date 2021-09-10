const { Schema, model } = require("mongoose");


const teacherSchema = new Schema({
      name: String,
      description: String,

  
});

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;