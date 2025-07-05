// App.js
import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Home } from './Components';
import './App.css';

import laptopImg from './assets/laptop.jpg';
import switchImg from './assets/Console.jpg';
import pcBlack from './assets/PC black.webp';
import pcWhite from './assets/PC white.webp';
import ps5Img from './assets/ps5.webp';
import ps5Controller from './assets/ps5Controller.webp';
import keyboardImg from './assets/keyboard.jpg';
import mouseImg from './assets/mouse.jpg';
import ledStrip from './assets/led-strip.jpg';

function App() {
  const staticProducts = [
    {
      _id: "1",
      name: "Acer Predator Gaming Laptop",
      description: "High-performance laptop with RGB keyboard.",
      price: 6499,
      image: laptopImg
    },
    {
      _id: "2",
      name: "Nintendo Switch Console",
      description: "Portable and home gaming console.",
      price: 1399,
      image: switchImg
    },
    {
      _id: "3",
      name: "RGB Gaming PC - Black",
      description: "Extreme gaming desktop with RGB cooling.",
      price: 9999,
      image: pcBlack
    },
    {
      _id: "4",
      name: "RGB Gaming PC - White",
      description: "Premium white gaming PC with RGB lights.",
      price: 9999,
      image: pcWhite
    },
    {
      _id: "5",
      name: "PlayStation 5 Console",
      description: "Next-gen console with ultra-fast SSD.",
      price: 2499,
      image: ps5Img
    },
    {
      _id: "6",
      name: "PS5 DualSense Controller",
      description: "Wireless controller with haptic feedback.",
      price: 349,
      image: ps5Controller
    },
    {
      _id: "7",
      name: "RGB Mechanical Keyboard",
      description: "Customizable RGB mechanical gaming keyboard.",
      price: 249,
      image: keyboardImg
    },
    {
      _id: "8",
      name: "Ultra-Light Gaming Mouse",
      description: "Lightweight honeycomb design with RGB.",
      price: 129,
      image: mouseImg
    },
    {
      _id: "9",
      name: "LED RGB Strip Light",
      description: "Remote-controlled LED strip for setup.",
      price: 99,
      image: ledStrip
    }
  ];

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [page, setPage] = useState('home');

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, id: product._id, qty: 1 }];
      }
    });
  };

  const handleUpdateQty = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: qty < 1 ? 1 : qty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert('✅ Proceeding to checkout!');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  let content;
  if (page === 'cart') {
    content = (
      <Cart
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    );
  } else if (page === 'products') {
    content = (
      <section id="products">
        <h2 className="home-products-title">Our Products</h2>
        <Products products={staticProducts} onAddToCart={handleAddToCart} />
      </section>
    );
  } else {
    content = (
      <Home products={staticProducts} onAddToCart={handleAddToCart} />
    );
  }

  return (
    <div className="App">
      <Navbar cartCount={cartCount} cartTotal={cartTotal} onNavigate={setPage} />
      {content}
    </div>
  );
}

export default App;
