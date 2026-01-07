const Profile = require('../models/Profile');

const getMe = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    if (!profile) return res.status(400).json({ msg: "Profil non trouvé" });
    res.json(profile);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { phone, address } },
      { new: true, upsert: true } // Upsert crée le profil s'il n'existe pas
    );
    res.json(profile);
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour');
  }
};

module.exports = {
  getMe,
  updateProfile
};