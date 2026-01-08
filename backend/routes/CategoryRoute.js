const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { createCategory, getCategories ,deleteCategory} = require('../controllers/CategoryController');
router.post('/', createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);
module.exports = router;