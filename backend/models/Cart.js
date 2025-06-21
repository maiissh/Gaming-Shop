const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {//user identifier
    type: String,
    required: true
  },
  items: [{//products in the cart
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {//how many products
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

//total amount
cartSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);