const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { register, login } = require('../controllers/UserController');
router.post('/register', register);
router.post('/login', login);

module.exports = router;