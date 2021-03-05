const mongoose = require("mongoose");
const validator = require("validator"); 

 //defining schema-----
const employeeScheme = new mongoose.Schema({

    fname : {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Minimum 3 letters required"]
    },

    lname :{
        type: String,
        required: true,
        minlength: [3, "Minimum 3 letters required"]
    },

    
    gender : {
        type: String,
        required: true
    },
    
    phone :{
        type: Number,
        required: true,
        unique: true,
        minlength: [10, "invalid phone no."],
        
    },
    
    email : {
        type: String,
        unique: true,
        required: true,
        maxlength: 30
    },
    
    password :{
        type: String,
        required: true,
        minlength: [8, "Must occupy 7 characters"]
    },

    confirmPassword :{
        type: String,
        required: true
    }
});

//creating collection..

const sturegister = new mongoose.model("Student_register", employeeScheme);

module.exports = sturegister ;