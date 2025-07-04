const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [] });
    cart.items = req.body.items;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 