//introduce express
const express = require('express');
//accessing the router function in express
const router = express.Router();
const passport = require('passport');

//greating get routes
router.get('/Login', (req, res)=>{
    res.render('adminstrationLogin'); //points to file name
})

//creating post route
router.post('/Login', passport.authenticate ('local', {failureRedirect:'/Login'}), (req, res)=>{
    res.redirect('dashboard') //route name to go after login is sucessful
});

//exporting
module.exports = router;
