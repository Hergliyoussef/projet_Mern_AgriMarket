const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ProfileController = require('../controllers/ProfileController');
const { getMe, updateProfile } = require('../controllers/ProfileController');
// @route   GET /api/profiles/me
// @desc    Obtenir le profil de l'utilisateur connecté
router.get('/me', auth, getMe);

// @route   POST /api/profiles/update
// @desc    Mettre à jour les infos du profil
router.post('/update', auth, updateProfile);

module.exports = router;