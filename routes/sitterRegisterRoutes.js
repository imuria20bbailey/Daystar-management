//introduce express /frame work for backend
const express = require('express');

//accessing the router function in express
const router = express.Router();

//importing the model name
const Sitter = require('../models/sitterRegistration');

//creating routes to get the form
router.get('/new-sitter', (req, res)=>{
    res.render('sitterData/sitter-registration');
    
});

//creating post route
router.post('/add-sitter', async(req, res)=>{
    try {
        const sitter = new Sitter(req, res);
        await sitter.save();
        console.log(req.body);
        res.render('sitterData/sitter-registration')
       
    } catch (error) { console.log(error);
        
    }
});




//exporting
module.exports = router;

