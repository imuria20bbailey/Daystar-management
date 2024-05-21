const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    baby_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Baby',
        required:true
  
     },

    item_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Item',
        required:true
  
     },
  
    quantity: { 
        type: Number, 
        required: true 
     },
    purchaseTime: {
        type: Date, 
        required: true 
     }
  
});

const Item = mongoose.model('Purchase', purchaseSchema);

module.exports = Item;
