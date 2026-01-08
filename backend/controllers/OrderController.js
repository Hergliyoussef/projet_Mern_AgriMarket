const Order = require('../models/Order');
const Product = require('../models/Product');

// --- 1. CRÉER UNE COMMANDE (POST) ---
const createOrder = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const productData = await Product.findById(product);
    if (!productData) return res.status(404).json({ msg: "Produit non trouvé" });

    const newOrder = new Order({
      client: req.user.id, // ID extrait du JWT 
      product,
      quantity,
      totalPrice: productData.price * quantity // Calcul sécurisé côté serveur
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 2. LIRE MES COMMANDES (GET) ---
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user.id }).populate('product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// --- 3. METTRE À JOUR LE STATUT (UPDATE - PUT) ---
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // ex: 'Confirmée', 'Livrée'
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { $set: { status: status } }, 
      { new: true }
    );
    
    if (!order) return res.status(404).json({ msg: "Commande non trouvée" });
    res.json({ msg: "Statut mis à jour", order });
  } catch (err) {
    res.status(500).send("Erreur lors de la mise à jour");
  }
};

// --- 4. ANNULER UNE COMMANDE (DELETE) ---
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Commande non trouvée" });

    // SÉCURITÉ CYBER : Seul le client qui a passé la commande peut l'annuler [cite: 49-50]
    if (order.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Non autorisé à annuler cette commande" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Commande annulée avec succès" });
  } catch (err) {
    res.status(500).send("Erreur lors de l'annulation");
  }
};

// --- BLOC D'EXPORTATION FINAL ---
module.exports = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  cancelOrder
};