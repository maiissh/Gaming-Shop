// Return cart info (handled on client)
exports.getCart = (req, res) => {
  res.status(200).json({ message: "Cart is handled in localStorage on client side." });
};

// Simulate cart update (client-side only)
exports.updateCart = (req, res) => {
  res.status(200).json({ message: "Cart update simulated. This is client-side only." });
};

// Simulate cart clear (client-side only)
exports.clearCart = (req, res) => {
  res.status(200).json({ message: "Cart cleared on client-side only." });
};
