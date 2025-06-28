import React, { useEffect, useState } from "react";
import "./category.css";
import axios from "axios";

const Category = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend when the component mounts
    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    // Add a product to the shopping cart (saved in localStorage)
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(p => p._id === product._id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("🛒 Product added to cart!");
    };

    return (
        <div className="category-container">
            <h2> Explore Our Gaming Collection🎮</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div className="product-card" key={product._id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>₪{product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
