//dependencies
const express = require('express');  //for posting
const mongoose = require('mongoose');  //for mongodb
const path = require('path');  //for pug
const passport = require('passport');  //for passport
const expressSession = require('express-session')({    //for express-session
    secret:'secret', 
    resave:false,
    saveUninitialized:false
})

//this hold the uri for database
require('dotenv').config();

//import register model with user details
const Adminstrator = require('./models/AdminRegister');


const port = process.env.port || 3000  // listening to port


//importing routes
const adminstratorRoutes = require('./routes/adminstrationRoutes');
const adminLoginRoutes = require('./routes/adminLoginRoutes');

//instantiations
const app = express();

//configurations
mongoose.connect(process.env.DATABASE,{
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

mongoose.connection
.once('open', () => {
    console.log('Mongoose connection open');
})
.on('error', err => {
    console.error(`Connection error: ${err.message}`)
});


//set app/view engine to path
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views')); //specify the directorate where the views are found

//middleware/ helps pick information to post
app.use(express.static(path.join(__dirname, 'dashboard')))  //set directorate for static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Express session configuration
app.use(expressSession);  //keep truck
app.use(passport.initialize());
app.use(passport.session());


//passport configuration
passport.use(Adminstrator.createStrategy());   //pointing to the model that has credentails for registration
passport.serializeUser(Adminstrator.serializeUser()); //assigns a unique serial number
passport.deserializeUser(Adminstrator.deserializeUser()); //when you log out, the serial number is crashed/deleted.

//use imported routes
app.use('/', adminstratorRoutes);
app.use('/', adminLoginRoutes)



//for invalid routes
app.get('*', (req, res) => {
    res.send('400! This is invalid URL.');
});
//boostrapping the server
app.listen(port, () => console.log(`listening on port ${port}`)); 