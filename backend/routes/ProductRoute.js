const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Pour protéger la création

// Import déstructuré depuis l'objet exporté à la fin du contrôleur
const { createProduct, getProducts } = require('../controllers/ProductController');

// Routes
router.post('/', auth, createProduct); // Protégé : seul un agriculteur connecté peut créer
router.get('/', getProducts);         // Public : tout le monde voit les produits

module.exports = router;