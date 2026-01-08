const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const newReview = new Review({
      user: req.user.id, 
      product,
      rating,
      comment
    });
    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).send('Erreur lors de l\'ajout de l\'avis');
  }
};

const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
                                .populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Avis non trouvé' });

    // SÉCURITÉ CYBER : Vérifier que c'est bien l'auteur 
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Action non autorisée' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Avis supprimé' });
  } catch (err) {
    res.status(500).send('Erreur suppression');
  }
};

module.exports = { createReview, getProductReviews, deleteReview };