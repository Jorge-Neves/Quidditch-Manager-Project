const { Schema, model } = require("mongoose");


const studentSchema = new Schema({
      name: String,
      description: String,
      

  
});

const Student = model("Student", studentSchema);

module.exports = Student;