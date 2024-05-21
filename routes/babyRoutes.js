const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Baby = require('../models/BabyRegistration');
const Sitter = require('../models/sitterRegistration');

// Route to get the form for registering a new baby
router.get('/new-baby', (req, res) => {
    Sitter.find()
        .then(sitters => {
            res.render('babyData/baby-registration', { title: 'Baby Clock-in Page', sitters });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
});

// Route to add a new baby
router.post('/add-baby', async (req, res) => {
    try {
        const baby = new Baby(req.body);
        await baby.save();

        const sitter_id = req.body.sitter_id;
        if (!mongoose.Types.ObjectId.isValid(sitter_id)) {
            return res.status(400).send('Invalid sitter ID.');
        }

       
       // Find the sitter by ID
       const currentBabies = await Sitter.findOne({ _id: new mongoose.Types.ObjectId(sitter_id) });

       if (currentBabies) {
           // Increment the number of babies
           const current_babies = currentBabies.numberOfBabies;

           const updates = {
               sitterStatus: 'Busy',
               numberOfBabies: current_babies + 1 // Increment the number of babies
           };

           // Update the sitter with the new number of babies and status
           await Sitter.findByIdAndUpdate(sitter_id, updates);

           // Log the updated number of babies
           //console.log(updates.numberOfBabies);

           // Send a success response
           res.send('Baby registered successfully!');
       } else {
           // If the sitter is not found
           console.log("Sitter not found");
           res.status(404).send('Sitter not found');
       }
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error fetching or updating sitter:", error);
        res.status(500).send('Failed to register baby.');
    }
});

        
// Route to view all babies
router.get('/babies', (req, res) => {
    Baby.find()
        .then(babies => {
            res.render('babyData/registered-babies', { title: 'Babies Page', babies });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
});

// Route to get the form for clocking out a baby
router.get('/baby-clockout', (req, res) => {
    Baby.find({ babyStatus: "clocked-in" })
        .then(babyData => {
            res.render('babyData/baby-clockout', { title: 'Baby Clock-out Page', babyData });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
});

// Route to clock out a baby
router.post('/add-baby-clockout', async (req, res) => {
    try {
        const babyId = req.body.baby_id;
        if (!mongoose.Types.ObjectId.isValid(babyId)) {
            return res.status(400).send('Invalid baby ID.');
        }

        const updates = {
            takenBy: req.body.takenBy,
            clockoutTime: req.body.clockoutTime,
            comment: req.body.comment,
            babyStatus: 'clocked-out'
        };

        await Baby.findByIdAndUpdate(babyId, updates);
        res.send('Baby clocked out successfully!');
    } catch (error) {
        console.log(error);
        res.send('Failed to clock out baby.');
    }
});


// Exporting the router
module.exports = router;
