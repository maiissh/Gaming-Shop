import React from 'react';
import Product from '../Product/Product';
import './Products.css';

function Products({ products, onAddToCart, fadeInRef }) {
  return (
    <div className={fadeInRef ? "products-grid fade-in-on-scroll" : "products-grid"} ref={fadeInRef}>
      {products.map((product) => (
        <Product key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default Products; 