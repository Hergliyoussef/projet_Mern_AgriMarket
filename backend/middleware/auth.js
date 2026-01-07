const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Récupérer le token du header
  const token = req.header('x-auth-token');

  // 2. Vérifier si le token existe
  if (!token) {
    return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });
  }

  // 3. Valider le token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // On injecte l'utilisateur dans la requête
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token non valide' });
  }
};