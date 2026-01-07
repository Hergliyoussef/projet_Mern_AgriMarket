const Category = require('../models/Category');

// --- 1. AJOUTER UNE CATÉGORIE (SÉCURISÉE CONTRE LES DOUBLONS) ---
const createCategory = async (req, res) => {
  try {
    const { type, season } = req.body;

    // PROTECTION : On cherche si le couple type/saison existe déjà
    let category = await Category.findOne({ type, season });
    
    if (category) {
      // Si trouvé, on bloque la création avec un code 400
      return res.status(400).json({ 
        msg: "Cette catégorie (ce type pour cette saison) existe déjà dans la base." 
      });
    }

    // Sinon, on procède à la création
    category = new Category({ type, season });
    await category.save();

    res.status(201).json({ 
      msg: 'Catégorie ajoutée avec succès', 
      category 
    });
  } catch (err) {
    res.status(500).send("Erreur lors de l'ajout de la catégorie");
  }
};

// --- 2. VOIR TOUTES LES CATÉGORIES ---
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send("Erreur serveur lors de la récupération");
  }
};

module.exports = {
  createCategory,
  getCategories
};