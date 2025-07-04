import React from 'react';
import './product.css';


// Example product data (you can replace with props or API data)
const products = [
  {
    id: 1,
    name: 'Gaming Mouse',
    image: '/images/mouse.jpg',
    description: 'Ultra-fast response, RGB lighting',
    price: 39.99,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    image: '/images/keyboard.jpg',
    description: 'Blue switches, backlit keys',
    price: 59.99,
  },
  {
    id: 3,
    name: 'Gaming Headset',
    image: '/images/headset.jpg',
    description: '7.1 surround sound',
    price: 49.99,
  },
  // Add more products...
];

function Product() {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <div className="product-card" key={item.id}>
          <img src={item.image} alt={item.name} className="product-img" />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="price-add">
            <span>${item.price.toFixed(2)}</span>
            <button>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Product;
