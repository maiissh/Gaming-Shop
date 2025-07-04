import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Home } from './Components';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('products from API:', data);
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      });
  }, []);

  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  // Save cart to localStorage whenever it changes
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
    alert('Proceeding to checkout!');
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
        <Products products={products} onAddToCart={handleAddToCart} />
      </section>
    );
  } else {
    content = (
      <Home products={products} onAddToCart={handleAddToCart} />
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
