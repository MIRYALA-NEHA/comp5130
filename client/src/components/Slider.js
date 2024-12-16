import React from 'react'

import './css/Best.css'; 

// importing functions............
import {moveRight , moveLeft} from './UTILS.js' ; 

export default function Slider() {

  return (
    <div>
        <section class="product">
            <h2 class="product-category">Data Structures</h2>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card1.png" class="product-thumb" alt=""/>
                        <button class="card-btn">Add to cart</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>

            
        </section>
    </div>
  )
}
