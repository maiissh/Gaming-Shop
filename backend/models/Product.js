const productSchema = new mongoose.Schema({
  name: { // Product name
    type: String,
    required: true,
    trim: true
  },
  description: { // Product description
    type: String,
    required: true
  },
  price: { // Product price
    type: Number,
    required: true,
    min: 0
  },
  category: { // Product category
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: { // Product image URL
    type: String,
    required: true
  },
  stock: { // Product stock quantity
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  isActive: { // Product availability
    type: Boolean,
    default: true
  },
  rating: { // Product rating
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{ // Product reviews
    user: String,
    comment: String,
    rating: Number,
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true // createdAt, updatedAt 
});