const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  paymentMethod: String,
  shippingMethod: String,
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      qty: Number,
    }
  ],
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
