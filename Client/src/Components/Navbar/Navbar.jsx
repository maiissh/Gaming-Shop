import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar({ cartCount, cartTotal, onNavigate }) {
  return (
    <nav className="navbar">
      {/* Logo and title, go to home on click */}
      <div className="navbar-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Gaming World Logo" />
        <span className="navbar-title">Gaming World</span>
      </div>

      {/* Navigation buttons */}
      <ul className="navbar-links">
        <li>
          <button className="nav-btn" onClick={() => onNavigate('home')}>Home</button>
        </li>
        <li>
          <button className="nav-btn" onClick={() => onNavigate('products')}>Products</button>
        </li>

        {/* Cart icon with count and total */}
        <li className="cart-link">
          <button className="nav-btn" onClick={() => onNavigate('cart')}>
            🛒
            <span className="cart-count">({cartCount})</span>
            <span className="cart-total">₪{cartTotal}</span>
          </button>
        </li>

        {/* Go to checkout */}
        <li className="checkout-link">
          <button className="nav-btn checkout-btn-navbar" onClick={() => onNavigate('checkout')}>
            Checkout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
