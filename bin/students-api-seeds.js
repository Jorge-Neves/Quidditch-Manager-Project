require("../db");
const axios = require("axios");
const Student = require("../models/Student.model")
let students = []

const getStudents = async()=> {
    const data = await axios.get("http://hp-api.herokuapp.com/api/characters/students");
    students = data.data;
    console.log(students)
    
    Student.insertMany(students).then((studentsFromDB) => {
        console.log(`students enrolled - ${studentsFromDB.length}`)
    })
    
};

getStudents();




