const express = require("express");
const router = express.Router();
const { 
    createOrder, 
    getAllOrders, 
    getUserOrders, 
    updateOrderStatus 
} = require("../controllers/orderController");

// Create new order
router.post("/", createOrder);

// Get all orders (for admin)
router.get("/", getAllOrders);

// Get orders for specific user
router.get("/user/:userId", getUserOrders);

// Update order status
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;