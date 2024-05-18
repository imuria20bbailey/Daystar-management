//introducing mongoose to the file
const mongoose = require('mongoose');

//access schema function in mongoose and store in the variable schema
const Schema = mongoose.Schema;

//using the functions to build data structure
const sitterRegistrationSchema = new Schema({
    sitterNumber:{
       type: String,
        trim: true
    },

    nin:{
        type: String,
        trim: true
        
     },

     fullName:{
        type: String,
        trim: true
        
     },

     contact:{
        type: String,
        trim: true
        
     },

     dateOfBirth:{
        type: String,
        trim: true
         
     },

     location:{
        type: String,
        trim: true
         
     },

     nextOfKin:{
        type: String,
         trim: true
     },

     referance:{
        type: String,
         trim: true
     },

     levelOfEducation:{
        type: String,
        default:Date.now,
         trim: true
     },

     gender: {
        type: String,
        trim: true,
        enum: ["Male", "Female"]

    },

    religion: {
      type: String,
      enum: ["Christian", "Islam"]

     },

   sitterStatus: {
     type: String,
     default: "Available",
     enum: ["Available", "Busy", "Absent"]

    }

});

//exporting our modules
module.exports = mongoose.model('Sitter', sitterRegistrationSchema);
