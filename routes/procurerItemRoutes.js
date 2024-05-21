const express = require('express');
const router = express.Router();
const Item = require('../models/Items'); // Ensure the correct path to the model

// Route to display items
router.get('/new-items', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('procurement/register-items', { items });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add new item
router.post('/add-items', async (req, res) => {
  const { name, quantity, price, saleItem } = req.body;
  const item = new Item({ 
    name, 
    quantity, 
    price, 
    saleItem: saleItem === 'on' 
  });
  try {
    await item.save();
    const items = await Item.find(); // Fetch the updated list of items
    res.render('procurement/register-items', { items });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
