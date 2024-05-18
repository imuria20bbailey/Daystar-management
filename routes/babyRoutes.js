//introduce express /frame work for backend
const express = require('express');

//accessing the router function in express
const router = express.Router();

//importing the model name
const Baby = require('../models/BabyRegistration');
const Sitter = require('../models/sitterRegistration');


//creating routes to get the form
router.get('/new-baby', (req, res)=>{
    //res.render('babyData/baby-registration');

    Sitter.find({ sitterStatus: "Available" })

    .then((sitters) => {
    console.log(sitters);
    res.render('babyData/baby-registration', { title: 'Baby Clock-in Page', sitters });
    })
    .catch(() => { 
        res.send('Sorry! Something went wrong.'); 
    });
    
});



//creating post route
router.post('/add-baby', async(req, res)=>{
    try {
        const baby = new Baby(req.body);
        await baby.save();
        console.log(req.body);
        // res.render('babyData/registered');
        res.send('Baby registered successfully!')
       
    } catch (error) { console.log(error);
        
    }
});


//creating routes to view all babies
router.get('/babies', (req, res)=>{

    Baby.find()

    .then((babies) => {
    console.log(babies);
    res.render('babyData/registeredBabies', { title: 'Babies Page', babies });
    })
    .catch(() => { 
        res.send('Sorry! Something went wrong.'); 
    });
    
});

 //creating routes to get the form
router.get('/baby-clockout', (req, res)=>{
    //res.render('babyData/baby-registration');

    Baby.find({ babyStatus: "clocked-in" })

    .then((babyData) => {
    // console.log(babyData);
    res.render('babyData/baby-clockout', { title: 'Baby Clock-out Page', babyData });
    })
    .catch(() => { 
        res.send('Sorry! Something went wrong.'); 
    });
    
});


//clocking out route
router.post('/add-baby-clockout', async(req, res)=>{
    try {
        // const baby = new Baby(req.body);
        // await baby.save();

        console.log(req.body.baby_id);
        const baby_id = { fullName: req.body.baby_id };
        const baby_updates = { $set: { takenBy: req.body.takenBy, clockoutTime: req.body.clockoutTime, comment: req.body.comment} };
        Baby.updateOne(baby_id, baby_updates);
        
        console.log(req.body);
        // res.render('babyData/registered');
        res.send('Baby clockout successfully!')
        



       
    } catch (error) { console.log(error);
        
    }
});

//Updating baby




//exporting
module.exports = router;

