const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
    try {
        const { 
            userId,
            items, 
            shippingAddress,
            paymentMethod,
            shippingMethod = "standard" // default value
        } = req.body;

        // Validate required data
        if (!userId || !items || items.length === 0) {
            return res.status(400).json({ message: "Invalid order data - missing userId or items" });
        }

        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || 
            !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            return res.status(400).json({ message: "Complete shipping address is required" });
        }

        if (!paymentMethod) {
            return res.status(400).json({ message: "Payment method is required" });
        }

        // Calculate total amount
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Add shipping cost based on method
        let shippingCost = 0;
        if (shippingMethod === "express") {
            shippingCost = 25; // 25 shekels for express shipping
        } else if (shippingMethod === "standard") {
            shippingCost = 0; // free shipping
        }

        const finalTotal = totalAmount + shippingCost;

        const newOrder = new Order({
            userId,
            items,
            totalAmount: finalTotal,
            shippingAddress,
            paymentMethod,
            status: 'pending'
        });

        const savedOrder = await newOrder.save();

        // Clear cart after successful order
        await Cart.findOneAndUpdate(
            { userId },
            { items: [], totalAmount: 0 }
        );

        res.status(201).json({ 
            message: "Order placed successfully", 
            orderId: savedOrder.orderId,
            totalAmount: finalTotal
        });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get orders for specific user
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('items.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { 
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus
};