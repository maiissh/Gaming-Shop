import React from 'react';
import Product from '../Product/Product';
import './Products.css';

function Products({ products, onAddToCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <Product key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default Products;
