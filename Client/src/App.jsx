import React, { useState, useEffect } from 'react';
import { Navbar, Products, Home } from './Components';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './Components/Checkout/Checkout.jsx';
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
    { _id: "1", name: "Acer Predator Gaming Laptop", price: 6499, image: laptopImg },
    { _id: "2", name: "Nintendo Switch Console", price: 1399, image: switchImg },
    { _id: "3", name: "RGB Gaming PC - Black", price: 9999, image: pcBlack },
    { _id: "4", name: "RGB Gaming PC - White", price: 9999, image: pcWhite },
    { _id: "5", name: "PlayStation 5 Console", price: 2499, image: ps5Img },
    { _id: "6", name: "PS5 DualSense Controller", price: 349, image: ps5Controller },
    { _id: "7", name: "RGB Mechanical Keyboard", price: 249, image: keyboardImg },
    { _id: "8", name: "Ultra-Light Gaming Mouse", price: 129, image: mouseImg },
    { _id: "9", name: "LED RGB Strip Light", price: 99, image: ledStrip }
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
    setCart((prev) => {
      const exists = prev.find(item => item.id === product._id);
      if (exists) {
        return prev.map(item =>
          item.id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, id: product._id, qty: 1 }];
      }
    });
  };

  const handleUpdateQty = (id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const renderPage = () => {
    if (page === 'cart') {
      return <Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onCheckout={() => setPage('checkout')} />;
    } else if (page === 'products') {
      return <Products products={staticProducts} onAddToCart={handleAddToCart} />;
    } else if (page === 'checkout') {
      return <Checkout cart={cart} onNavigate={setPage} clearCart={clearCart} />;
    } else {
      return <Home products={staticProducts} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} cartTotal={cartTotal} onNavigate={setPage} />
      {renderPage()}

      <footer style={{
        backgroundColor: '#111',
        color: '#00ffe7',
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px',
        borderTop: '1px solid #0ff4',
        fontSize: '0.95em'
      }}>
        © 2025 Gaming World 🎮 | All rights reserved.<br />
        Built with 💻 by Mais & fatima
      </footer>
    </div>
  );
}

export default App;
