import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

<div className="page-content">{

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo"> GamingShop🎮</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/order">Order</Link></li>
      </ul>
    </nav>
  );
}
}</div>
export default NavBar;
