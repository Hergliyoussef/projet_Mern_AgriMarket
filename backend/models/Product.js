const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true
   },
  price:
   { 
    type: Number, required: true 
  },
  owner: 
  {
     type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
     required: true 
    },
  categories: 
  [{ type: mongoose.Schema.Types.ObjectId,
     ref: 'Category' 
    }]
});
module.exports = mongoose.model('Product', productSchema);