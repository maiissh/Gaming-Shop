import React from "react";
import "./NavBar.css";
import logo from "../../logo.png"; // الصورة محفوظة داخل src/

const NavBar = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Gaming Logo" className="logo-img" />
                <h1>Gaming Shop</h1>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/order">
                    🛒 Cart ({totalItems}) - ₪{totalPrice.toFixed(2)}
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
