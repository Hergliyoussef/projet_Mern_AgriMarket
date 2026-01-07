const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { createCategory, getCategories } = require('../controllers/CategoryController');
router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;