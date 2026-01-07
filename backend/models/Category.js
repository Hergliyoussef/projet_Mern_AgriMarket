const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  type: 
  { type: String,
     enum: ['fruit', 'legumes'], 
     required: true },
  season:
   { type: String, 
    enum: ['ete', 'hiver', 'printemps', 'automne', 'toute l\'annee'], 
    required: true 
  }
});
module.exports = mongoose.model('Category', categorySchema);