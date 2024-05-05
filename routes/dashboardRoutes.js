//introduce express
const express = require('express');
//accessing the router function in express
const router = express.Router();

//creating the get route
router.get('/dashboard', (req, res)=>{
    res.render('main-dashboard')
});

//exporting
module.exports = router;
