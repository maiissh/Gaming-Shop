
exports.getCart = (req, res) => {
  res.status(200).json({ message: "Cart is handled in localStorage on client side." });
};

exports.updateCart = (req, res) => {
  res.status(200).json({ message: "Cart update simulated. This is client-side only." });
};

exports.clearCart = (req, res) => {
  res.status(200).json({ message: "Cart cleared on client-side only." });
};
