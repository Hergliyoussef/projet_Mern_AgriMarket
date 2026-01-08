const Category = require('../models/Category');

// --- 1. CRÉER (POST) ---
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) { 
    res.status(500).json({ msg: "Erreur lors de la création" }); 
  }
};

// --- 2. LIRE TOUT (GET) ---
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// --- 3. METTRE À JOUR (PUT) ---
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    if (!category) return res.status(404).json({ msg: "Catégorie non trouvée" });
    res.json(category);
  } catch (err) {
    res.status(500).send("Erreur de mise à jour");
  }
};

// --- 4. SUPPRIMER (DELETE) ---
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ msg: "Catégorie non trouvée" });
    res.json({ msg: "Catégorie supprimée avec succès" });
  } catch (err) {
    res.status(500).send("Erreur lors de la suppression");
  }
};

// --- LE BLOC D'EXPORTATION FINAL (INDISPENSABLE) ---
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};