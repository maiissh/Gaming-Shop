import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";

const Order = () => {
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        shipping: "pickup"
    });

    // Load cart from localStorage when component mounts
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit order
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.address) {
            alert("Please fill all required fields.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const orderData = {
            customer: form,
            items: cart,
            shippingMethod: form.shipping
        };

        try {
            const res = await axios.post("http://localhost:5000/api/orders", orderData);
            alert("✅ Order submitted successfully! Order ID: " + res.data.orderId);
            localStorage.removeItem("cart");
            setCart([]);
        } catch (err) {
            alert("❌ Error submitting order.");
            console.error(err);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="order-container">
            <h2>Review Your Order</h2>
            <div className="order-summary">
                {cart.map(item => (
                    <div className="order-item" key={item._id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ₪{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <h3>Cart Total: ₪{total.toFixed(2)}</h3>
            </div>

            <form className="order-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Shipping Address" value={form.address} onChange={handleChange} required />

                <label>Shipping Method:</label>
                <select name="shipping" value={form.shipping} onChange={handleChange}>
                    <option value="pickup">Free Store Pickup</option>
                    <option value="home">₪20 - Home Delivery (3-5 days)</option>
                    <option value="express">₪50 - Express Delivery (1 day)</option>
                </select>

                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default Order;
