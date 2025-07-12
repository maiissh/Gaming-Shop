const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/gamingshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected✅'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(' Gaming Shop API is running🎮');
});

app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes); 

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}🚀`);
});
