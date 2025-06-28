const express = require("express");
const router = express.Router();

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

// Get user's shopping cart
router.get("/:userId", getCart);

// Add product to cart
router.post("/add", addToCart);

// Update product quantity
router.put("/update", updateCartItem);

// Remove product from cart
router.delete("/remove", removeFromCart);

// Clear entire cart
router.delete("/clear/:userId", clearCart);

module.exports = router;