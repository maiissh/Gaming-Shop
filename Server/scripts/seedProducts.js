const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://localhost:27017/gamingshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const sampleProducts = [
    { name: "Acer Predator Gaming Laptop", price: 6499, image: "laptop.jpg" },
    { name: "Nintendo Switch Console", price: 1399, image: "Console.jpg" },
    { name: "RGB Gaming PC - Black", price: 9999, image: "PC black.webp" },
    { name: "RGB Gaming PC - White", price: 9999, image: "PC white.webp" },
    { name: "PlayStation 5 Console", price: 2499, image: "ps5.webp" },
    { name: "PS5 DualSense Controller", price: 349, image: "ps5Controller.webp" },
    { name: "RGB Mechanical Keyboard", price: 249, image: "keyboard.jpg" },
    { name: "Ultra-Light Gaming Mouse", price: 129, image: "mouse.jpg" },
    { name: "LED RGB Strip Light", price: 99, image: "led-strip.jpg" }
  ];

  await Product.deleteMany(); // حذف الموجود
  await Product.insertMany(sampleProducts); // إضافة الجديد
  console.log("✅ Products inserted to MongoDB");
  mongoose.disconnect();
}).catch((err) => {
  console.error("❌ Error connecting or inserting:", err);
});
