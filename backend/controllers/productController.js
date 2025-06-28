const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            image,
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllProducts, createProduct };
