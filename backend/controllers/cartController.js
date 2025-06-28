const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's shopping cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId }).populate('items.product');
        
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        
        // Find existing item in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (existingItemIndex > -1) {
            // If product exists, increase quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price
            });
        }
        
        await cart.save();
        await cart.populate('items.product');
        
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

// Update product quantity in cart
const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1" });
        }
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate('items.product');
        
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error updating cart:", err);
        res.status(500).json({ error: "Failed to update cart" });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        
        await cart.save();
        await cart.populate('items.product');
        
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        
        cart.items = [];
        await cart.save();
        
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (err) {
        console.error("Error clearing cart:", err);
        res.status(500).json({ error: "Failed to clear cart" });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};