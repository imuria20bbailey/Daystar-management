//introduce express
const express = require('express');

//accessing the rouisterter function in express
const router = express.Router();

//importing the model name
const Baby = require('../models/BabyRegistration');

//creating routes to get the form
router.get('/baby-register', (req, res)=>{
    res.render('/baby-registration');
});

//creating post route
router.post('/baby-register', async(req, res)=>{
    try {
        const baby = new Baby(req, res);
        await baby.register();
        console.log(req.body);
        res.render('/baby-registration')
       
    } catch (error) { console.log(error);
        
    }
});

//expoerting
module.exports = router;

