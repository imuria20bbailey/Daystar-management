//introduce express /frame work for backend
const express = require('express');

//accessing the router function in express
const router = express.Router();

//importing the model name
const Baby = require('../models/BabyRegistration');

//creating routes to get the form
router.get('/baby-register', (req, res)=>{
    res.render('babyData/baby-registration');
    
});

//creating post route
router.post('/baby-register', async(req, res)=>{
    try {
        const baby = new Baby(req, res);
        await baby.save();
        // console.log(req.body);
        res.render('babyData/baby-registration')
       
    } catch (error) { console.log(error);
        
    }
});




//exporting
module.exports = router;

