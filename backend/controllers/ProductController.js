const Product = require('../models/Product');

// --- CREATE (POST) --- [cite: 47]
const createProduct = async (req, res) => {
  try {
    const { name, price, categories } = req.body;
    const newProduct = new Product({
      name,
      price,
      categories,
      owner: req.user.id // Identification via JWT [cite: 51]
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la création' });
  }
};

// --- READ ALL & READ ONE (GET) --- [cite: 47]
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categories', 'type season');
    res.json(products);
  } catch (err) { res.status(500).send('Erreur serveur'); }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categories');
    if (!product) return res.status(404).json({ msg: 'Produit non trouvé' });
    res.json(product);
  } catch (err) { res.status(500).send('Erreur format ID'); }
};

// --- UPDATE (PUT) --- [cite: 47]
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Inexistant' });

    // VERIFICATION CYBER : Seul l'owner peut modifier [cite: 49]
    if (product.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Non autorisé' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(product);
  } catch (err) { res.status(500).send('Erreur update'); }
};

// --- DELETE --- [cite: 47]
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Inexistant' });

    // Vérification de propriété pour la sécurité 
    if (product.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Non autorisé' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Produit supprimé' });
  } catch (err) { res.status(500).send('Erreur delete'); }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};