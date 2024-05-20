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
        const sitter = new Sitter(req.body);
        await sitter.save();
        console.log(req.body);
        //res.render('sitterData/renderSitters');
        res.send('sitter registration successful!'); 

    } catch (error) { console.log(error);
        
    }
});

// fetch all sitters
router.get('/sitters', async (req, res) => {
    try {
        const sitters = await Sitter.find();
        res.render('sitterData/registered-sitters', { sitters });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});





//exporting
module.exports = router;

