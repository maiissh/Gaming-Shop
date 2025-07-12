import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar({ cartCount, cartTotal, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);

      // Automatically close menu on large screen
      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo + Title */}
      <div className="navbar-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Gaming World Logo" />
        <span className="navbar-title">Gaming World</span>
      </div>

      {/* Hamburger icon for mobile */}
      {isMobile && (
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
      )}

      {/* Navigation links */}
      <ul className={`navbar-links ${isMobile ? (menuOpen ? 'show-menu' : 'hide-menu') : ''}`}>
        <li><button className="nav-btn" onClick={() => onNavigate('home')}>Home</button></li>
        <li><button className="nav-btn" onClick={() => onNavigate('products')}>Products</button></li>
        <li>
          <button className="nav-btn" onClick={() => onNavigate('cart')}>
            🛒 <span className="cart-count">({cartCount})</span> ₪{cartTotal}
          </button>
        </li>
        <li>
          <button className="nav-btn checkout-btn-navbar" onClick={() => onNavigate('checkout')}>Checkout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
