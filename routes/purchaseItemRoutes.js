const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { format } = require('date-fns');

// Ensure the correct path to the model
const Purchase = require('../models/Purchase');
const Baby = require('../models/BabyRegistration');
const Item = require('../models/Items');

// Route to display items
router.get('/new-purchase', async (req, res) => {
  try {
    const items = await Item.find();
    const babies = await Baby.find({babyStatus: "clocked-in"});
    res.render('sales/purchase-item', { items, babies });
  } catch (err) {
    res.status(500).send(err);
  }
});
// Route to add new purchase
router.post('/add-purchase', async (req, res) => {
    const { baby_id, item_id, quantity, purchaseTime } = req.body;
    const purchase = new Purchase({ 
      baby_id,
      item_id, 
      quantity, 
      purchaseTime, 
    });
  
    try {
      // Save the new purchase
      await purchase.save();
  
      // Validate and update item quantity
      const isValidObjectId = mongoose.Types.ObjectId.isValid(item_id);
      if (!isValidObjectId) {
        return res.status(400).send('Invalid item ID.');
      }
      
      const currentItem = await Item.findById(item_id);
      if (!currentItem) {
        return res.status(404).send('Item not found');
      }
  
      const currentQuantity = currentItem.quantity;
      const purchaseQuantity = parseInt(quantity, 10);
  
      if (purchaseQuantity > currentQuantity) {
        return res.status(400).send('Insufficient quantity available.');
      }
  
      const newQuantity = currentQuantity - purchaseQuantity;
      await Item.findByIdAndUpdate(item_id, { quantity: newQuantity });
  
      // Fetch and format purchases
      let purchases = await Purchase.find().lean();
      purchases = await Promise.all(purchases.map(async (purchase) => {
        const baby = await Baby.findOne({ _id: purchase.baby_id }).lean();
        purchase.baby_details = baby;
        const item = await Item.findOne({ _id: purchase.item_id }).lean();
        purchase.item_details = item;
        purchase.formattedPurchaseTime = format(new Date(purchase.purchaseTime), 'MMMM do, yyyy H:mm a');
        return purchase;
      }));
  
      // Render the updated list of purchases
      res.render('sales/purchase-item', { purchases });
    } catch (err) {
      // Handle any errors
      console.error("Error adding purchase:", err);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;
