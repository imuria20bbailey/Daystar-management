//introduce express /frame work for backend
const express = require('express');

//accessing the router function in express
const router = express.Router();

//importing the model name
const Sitter = require('../models/sitterRegistration');
const Baby = require('../models/BabyRegistration');


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



//route to fetch available sitters
router.get('/available-sitters', async (req, res) => {
    try {
        // Fetch sitters and populate babies
        const sitters = await Sitter.find({ sitterStatus: "Busy" });
        console.log(sitters);

        // const sittersWithPayout = sitters.map(sitter => {
        //     const numberOfBabies = sitter.babies.length;
        //     const payout = numberOfBabies * 3000;
        //     return { ...sitter.toObject(), numberOfBabies, payout };
        // });

        res.render('sitterData/sitter-payouts', { title:"Sitters Payout Page", sitters });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


//route to mark sitters paid and clear the sitters activity
router.get('/confirm-sitter-payout/:id', async (req, res) => {
    try {

        const sitterId = req.params.id;
        //await Baby.updateMany({ sitter: sitterId }, { $unset: { sitter: "" } }); // Detach babies from sitter
        await Sitter.findByIdAndUpdate(sitterId, { sitterStatus:"Available", numberOfBabies: 0, paid: true });
        res.redirect('/available-sitters');
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});





//exporting
module.exports = router;

