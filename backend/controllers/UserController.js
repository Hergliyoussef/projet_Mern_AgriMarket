const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. FONCTION D'INSCRIPTION (REGISTER) ---
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });

    user = new User({ name, email, password, role });

    // Hachage du mot de passe (Sécurité Cyber)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Création du Token JWT
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      
      // CORRECTION : On envoie UNE SEULE réponse contenant les deux informations
      res.status(201).json({ 
        msg: 'Utilisateur inscrit avec succès', 
        token: token 
      });
    });
  } catch (err) {
    res.status(500).send('Erreur serveur lors de l\'inscription');
  }
};

// --- 2. FONCTION DE CONNEXION (LOGIN) ---
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Identifiants invalides' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
       res.status(201).json({ 
        msg: 'Connexion réussie', 
        token: token 
  });});
  } catch (err) {
    res.status(500).send('Erreur serveur lors de la connexion');
  }
};

// --- 3. EXPORTATION ---
module.exports = {
  register,
  login
};