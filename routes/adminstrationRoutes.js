//introduce express
const express = require('express');

//accessing the router function in express
const router = express.Router();

//importing the model name
const Adminstrator = require('../models/AdminRegister');

//creating routes to get the form
router.get('/admin', (req, res)=>{
    res.render('adminRegistration');
});

//creating post route
router.post('/admin', async(req, res)=>{
    try {
        const admin = new Adminstrator(req.body);
        await Adminstrator.register(admin, req.body.password, (err)=>{
            if (err){
                throw err
            }
            res.redirect('/admin')
        })
    } catch (error) {
        res.status(400).send('registration failed')
        console.log(error)
        
    }
});

//expoerting
module.exports = router;
