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
        
     },

     location:{
        type: String,
        
     },

     guardian:{
        type: String,
        
     },

     parentsName:{
        type: String,
         
     },

     periodOfStay:{
        type: String,
         
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
        

        enum: ["Male", "Female"]

    }

});

//exporting our modules
module.exports = mongoose.model('Baby', babyRegistrationSchema);
