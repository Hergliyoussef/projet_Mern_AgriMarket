const Product = require('../models/Product');

// --- 1. CRÉER UN PRODUIT LIÉ À UNE CATÉGORIE ---
const createProduct = async (req, res) => {
  try {
    const { name, price, categories } = req.body; 

    const newProduct = new Product({
      name,
      price,
      categories, // On stocke l'ID unique de la catégorie
      owner: req.user.id // ID extrait du Token JWT
    });

    const product = await newProduct.save();
    
    res.status(201).json({ 
      msg: 'Produit créé et lié avec succès', 
      product 
    });
  } catch (err) {
    res.status(500).send('Erreur lors de la création du produit');
  }
};

// --- 2. RÉCUPÉRER TOUS LES PRODUITS ---
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('categories', 'type season') // Remplace l'ID par les infos
      .populate('owner', 'name email');
      
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send('Erreur serveur lors de la récupération');
  }
};

module.exports = {
  createProduct,
  getProducts
};