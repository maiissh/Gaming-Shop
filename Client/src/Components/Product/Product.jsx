import React from 'react';
import './Product.css';

function Product({ product, onAddToCart }) {
  return (
    <div className="product-card" key={product._id}>
    <img src={`/images/${product.image}`} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <div className="product-bottom">
        <span className="product-price">₪{product.price}</span>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
