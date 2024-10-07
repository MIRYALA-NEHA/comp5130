import React from 'react';
import './css/Best.css'; 

// Importing functions
import { moveRight, moveLeft } from './UTILS.js'; 

const Slider = () => {
  return (
    <div>
      <section className="product">
        <h2 className="product-category">Data Structures</h2>
        <div className="product-card">
          <div className="product-image">
            <span className="discount-tag">50% off</span>
            <img src="img/card1.png" className="product-thumb" alt="Product" />
            <button className="card-btn">Add to cart</button>
          </div>
          <div className="product-info">
            <h2 className="product-brand">Brand</h2>
            <p className="product-short-des">A short line about the product..</p>
            <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slider;
