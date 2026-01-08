const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createReview, 
  getProductReviews, 
  deleteReview 
} = require('../controllers/ReviewController');

// --- 1. AJOUTER UN AVIS (POST) ---
router.post('/', auth, createReview);

// --- 2. VOIR LES AVIS D'UN PRODUIT (GET) ---
// Route publique : Tout le monde peut voir les avis d'un produit 
router.get('/:productId', getProductReviews);

// --- 3. SUPPRIMER UN AVIS (DELETE) ---
router.delete('/:id', auth, deleteReview);

module.exports = router;