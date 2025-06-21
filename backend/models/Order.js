const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  items: [{//order items
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending',
         'processing', 
         'shipped',
          'delivered',
           'cancelled'
        ],
    default: 'pending'
  },

  shippingAddress: {
    fullName: { 
        type: String,
         required: true 
        },
    phone: {
         type: String,
          required: true
         },
    address: { 
        type: String,
         required: true 
        },
    city: {
         type: String,
         required: true 
        },
    postalCode: { 
        type: String, 
        required: true 
    }
  },

  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'paypal'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);