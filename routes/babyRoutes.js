const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Baby = require('../models/BabyRegistration');
const Sitter = require('../models/sitterRegistration');

// Route to get the form for registering a new baby
router.get('/new-baby', (req, res) => {
    Sitter.find({ sitterStatus: "Available" })
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
        res.send('Baby registered successfully!');
    } catch (error) {
        console.log(error);
        res.send('Failed to register baby.');
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

// Route to get sitters and their respective payouts
router.get('/sitter-payouts', async (req, res) => {
    try {
        // Find all babies and populate their sitters
        const babies = await Baby.find().populate('sitter_id').exec();

        // Calculate payouts
        const sitterPayouts = {};
        babies.forEach(baby => {
            if (baby.sitter_id && baby.babyStatus === 'clocked-out') {
                const sitterId = baby.sitter_id._id;
                const sitterName = baby.sitter_id.fullName;

                if (!sitterPayouts[sitterId]) {
                    sitterPayouts[sitterId] = { sitterName, babyCount: 0, payout: 0 };
                }

                sitterPayouts[sitterId].babyCount += 1;
                sitterPayouts[sitterId].payout += 3000; // 3000 UGX per baby
            }
        });

        res.render('sitterData/sitter-payouts', { title: 'Sitter Payouts', sitterPayouts });
    } catch (error) {
        console.error(error);
        res.send('Sorry! Something went wrong.');
    }
});



// Exporting the router
module.exports = router;
