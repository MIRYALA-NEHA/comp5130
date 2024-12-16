import React from 'react';
import './css/Details.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './contexts/CartContext'; // Import Cart Context

export default function Detail() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access addToCart from Cart Context

    const handlePayment = (data) => {
        addToCart(data)
        navigate(`/cart`);
    };

    const calculateDiscount = (price, actualPrice) => {
        if (!price || !actualPrice || actualPrice <= 0) return 0;
        return ((actualPrice - price) / actualPrice * 100).toFixed(2);
    };

    const roundedDiscount = calculateDiscount(data.price, data.actualPrice);

    return (
        <div>
            <section className="product-details">
                <div className="image-slider">
                    <div className="product-images">
                        <img src={data.image || 'default-image.png'} className="active" alt="Main Thumbnail" />
                    </div>
                </div>

                <div className="details">
                    <h2 className="product-brand">{data.courseTitle}</h2>
                    <p className="product-short-des">{data.overview || 'No overview available'}</p>
                    <span className="product-price">$ {data.price}</span>
                    <span className="product-actual-price">$ {data.actualPrice}</span>
                    <span className="product-discount">({roundedDiscount}% off)</span>

                    <p id="creatorName">Creator: {data.creatorName}</p>

                    <button className="btn cart-btn" onClick={() => addToCart(data)}>
                        Add to Cart
                    </button>
                    <button className="btn" onClick={() => handlePayment(data)}>Buy Now</button>
                </div>
            </section>

            <section className="detail-des">
                <h2 className="heading">Description</h2>
                <p className="des">{data.description || 'No description available'}</p>
            </section>
        </div>
    );
}
