import React, { useState, useEffect } from 'react';
import { Navbar, Products, Home } from './Components';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './Components/Checkout/Checkout.jsx';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [page, setPage] = useState('home');

  // 🔁 Load products from backend API
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  // 💾 Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ➕ Add item to cart
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

  // 🔄 Update quantity
  const handleUpdateQty = (id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  // ❌ Remove item
  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // 🧹 Clear cart after order
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  // 🌐 Page routing
  const renderPage = () => {
    if (page === 'cart') {
      return <Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onCheckout={() => setPage('checkout')} />;
    } else if (page === 'products') {
      return <Products products={products} onAddToCart={handleAddToCart} />;
    } else if (page === 'checkout') {
      return <Checkout cart={cart} onNavigate={setPage} clearCart={clearCart} />;
    } else {
      return <Home products={products} onAddToCart={handleAddToCart} />;
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
        Built with 💻 by Mais & Fatima
      </footer>
    </div>
  );
}

export default App;
