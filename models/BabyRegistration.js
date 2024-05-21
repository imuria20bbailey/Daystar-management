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

     guardian:{
        type: String,
        trim: true
        
     },

     parentsName:{
        type: String,
        trim: true
         
     },

     periodOfStay:{
        type: String,
        enum: ['Full Day', 'Half Day']
        
         
     },

     fee:{
        type: Number,
        enum: ['15000', '10000']
         
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

     },

     sitter_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Sitter',
      trim:true

   },

   
   

   clockoutTime: {
      type: Date,
      default:null,
       trim: true

   },

   babyStatus: {
      type: String,
      default: "clocked-in",
      enum: ["clocked-in", "clocked-out"]
   },

   takenBy: {
      type: String,
      default: null,
      trim:true
     
   },

   comment: {
      type: String,
      default: null,
      trim:true

   }

});


//exporting our modules
module.exports = mongoose.model('Baby', babyRegistrationSchema);
