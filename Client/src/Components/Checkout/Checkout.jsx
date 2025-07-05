import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, onNavigate, clearCart }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const shippingPrices = {
    standard: 0,
    express: 30,
    home: 64,
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shippingCost = shippingPrices[shippingMethod] || 0;
  const grandTotal = cartTotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !paymentMethod || !shippingMethod) {
      alert("Please fill in all fields and select options.");
      return;
    }

    const order = {
      name,
      address,
      email,
      paymentMethod,
      shippingMethod,
      cart,
      total: grandTotal,
    };

    console.log("Order submitted:", order);
    localStorage.removeItem("cart");
    clearCart();
    setShowSuccess(true);
    setTimeout(() => {
      onNavigate('home');
    }, 2500);
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
           Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>

        <label>
           Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select</option>
            <option value="credit"> Credit Card💳</option>
            <option value="paypal"> PayPal🪙</option>
            <option value="cash"> Cash on Delivery💵</option>
          </select>
        </label>

        <label>
           Shipping Method:
          <select value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)} required>
            <option value="">Select</option>
            <option value="standard"> Standard📦 (Free)</option>
            <option value="express"> Express🚀 (30₪)</option>
            <option value="home"> Home Delivery🏡 (64₪)</option>
          </select>
        </label>

        <div className="total-box">
          <p> Subtotal🧺: {cartTotal}₪</p>
          <p> Shipping🚚: {shippingCost}₪</p>
          <p className="grand-total"> Total💰: {grandTotal}₪</p>
        </div>

        <button type="submit" className="confirm-btn"> Confirm Order✅</button>
      </form>

      {showSuccess && (
        <div className="checkout-success">
           Order Confirmed!🎉
        </div>
      )}
    </div>
  );
};

export default Checkout;
