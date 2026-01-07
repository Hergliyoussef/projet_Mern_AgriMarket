const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  client:
   { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
   },
  products: 
  [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Product' }],
  totalPrice: 
  { 
    type: Number, 
    required: true 
  },
  status:
   {
    type: String, 
    enum: ['En attente', 'Confirmée', 'Annulée'],
    default: 'En attente' 
    }
});
module.exports = mongoose.model('Order', orderSchema);