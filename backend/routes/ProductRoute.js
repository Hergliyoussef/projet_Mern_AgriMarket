const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Pour protéger la création

// Import déstructuré depuis l'objet exporté à la fin du contrôleur
const { createProduct, getProducts,updateProduct ,deleteProduct} = require('../controllers/ProductController');

// Routes
router.post('/', auth, createProduct); // Protégé : seul un agriculteur connecté peut créer
router.get('/', getProducts);         // Public : tout le monde voit les produits
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);
module.exports = router;