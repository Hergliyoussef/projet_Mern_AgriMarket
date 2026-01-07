const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware de sécurité

// ÉTAPE CRUCIALE : Utilise la déstructuration { } pour importer
const { createOrder, getMyOrders } = require('../controllers/OrderController');

// @route   POST /api/orders
// @desc    Créer une commande (Protégé par Token)
router.post('/', auth, createOrder);

// @route   GET /api/orders/me
// @desc    Voir mes commandes (Protégé par Token)
router.get('/me', auth, getMyOrders);

module.exports = router;