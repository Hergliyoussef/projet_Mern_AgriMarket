const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const newOrder = new Order({
      client: req.user.id, // Sécurité : ID pris du token
      products,
      totalPrice
    });
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).send("Erreur lors de la commande");
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.user.id }).populate('products', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  createOrder,
  getMyOrders
};