import React, { useRef, useEffect, useState } from 'react';
import Products from '../Products/Products';
import setupMain from '../../assets/set-up.png';
import './Home.css';

function Home({ products, onAddToCart }) {
  // Fade-in animation for products
  const gridRef = useRef();
  const [showProducts, setShowProducts] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setShowProducts(true);
        gridRef.current.classList.add('fade-in');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-main">
      <div className="home-title-anim">Gaming World</div>
      <img src={setupMain} alt="Setup" className="home-setup-main" />

      <section className="home-products">
        <h2 className="home-products-title">Our Products</h2>
        <div style={{ minHeight: '200px' }}>
          {showProducts && (
            <Products products={products} onAddToCart={onAddToCart} fadeInRef={gridRef} />
          )}
          {!showProducts && <div ref={gridRef}></div>}
        </div>
      </section>
    </div>
  );
}

export default Home; 