//introducing mongoose to the file
const mongoose = require('mongoose');

//access schema function in mongoose and store in the variable schema
const Schema = mongoose.Schema;

//using the functions to build data structure
const babyRegistrationSchema = new Schema({
    fullName:{
       type: String,
        trim: true
    },

    age:{
        type: Number,
         trim: true
     },

     location:{
        type: String,
         trim: true
     },

     gaurdian:{
        type: String,
         trim: true
     },

     parentsName:{
        type: String,
         trim: true
     },

     periodOfStay:{
        type: String,
         trim: true
     },

     fee:{
        type: String,
         trim: true
     },

     babyNumber:{
        type: String,
         trim: true
     },

     timeOfArrival:{
        type: String,
        default:Date.now,
         trim: true
     },

     gender: {
        type: String,
        trim: true,
        default: "Male",
        enum: ["Male", "Female"]

    }

});

//exporting our modules
module.exports = mongoose.model('Baby', babyRegistrationSchema);
