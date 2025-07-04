import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar({ cartCount, cartTotal, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate('home')} style={{cursor: 'pointer'}}>
        <img src={logo} alt="Gaming World Logo" />
        <span className="navbar-title">Gaming World</span>
      </div>
      <ul className="navbar-links">
        <li><button className="nav-btn" onClick={() => onNavigate('home')}>Home</button></li>
        <li><button className="nav-btn" onClick={() => onNavigate('products')}>Products</button></li>
        <li className="cart-link">
          <button className="nav-btn" onClick={() => onNavigate('cart')}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
            <span className="cart-total">₪{cartTotal}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 