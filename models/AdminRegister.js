//introducing mongoose to the file
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
//access schema function in mongoose and store in the variable schema
const Schema = mongoose.Schema;

//using the functions to build data structure
const adminstratorSchema = new Schema({
    fullName:{
        type: String,
        trim: true
    },

    email:{
        type: String,
        trim: true
    },

    password:{
        type: String,
        trim: true
    },
    
    phoneNumber:{
        type: String,
        trim: true
    }

});

//helps to identify out of the many fileds, what admin will use to login to the system
adminstratorSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

//exporting our modules
module.exports = mongoose.model('Adminstrator', adminstratorSchema);
