const Order = require("../models/Order");

const createOrder = async (req, res) => {
    try {
        const { customer, items, shippingMethod } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newOrder = new Order({
            customer,
            items,
            shippingMethod,
            total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            createdAt: new Date()
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({ message: "Order placed", orderId: savedOrder._id });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createOrder };
