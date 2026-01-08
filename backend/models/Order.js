const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Vérifie bien que ton modèle Product s'appelle 'Product'
    required: true
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
  
});

module.exports = mongoose.model('Order', OrderSchema);