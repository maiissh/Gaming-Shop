import React from 'react';
import './order.css';


// Dummy cart items for display
const cartItems = [
  {
    id: 1,
    name: 'Gaming Mouse',
    image: '/images/mouse.jpg',
    quantity: 2,
    price: 39.99,
  },
  {
    id: 2,
    name: 'Gaming Headset',
    image: '/images/headset.jpg',
    quantity: 1,
    price: 49.99,
  },
];

function Order() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-page">
      <h2>Order Summary</h2>

      <div className="order-items">
        {cartItems.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="order-form">
        <h3>Shipping Info</h3>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone Number" required />
        <input type="text" placeholder="Address" required />

        <select required>
          <option value="">Choose delivery method</option>
          <option value="home">Home Delivery (3 days)</option>
          <option value="pickup">Pickup (Free)</option>
        </select>

        <div className="total-price">Total: ${total.toFixed(2)}</div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Order;
