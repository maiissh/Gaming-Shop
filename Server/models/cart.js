const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number,
      image: String,
    }
  ],
  userId: { type: String },
});

module.exports = mongoose.model('Cart', cartSchema); 