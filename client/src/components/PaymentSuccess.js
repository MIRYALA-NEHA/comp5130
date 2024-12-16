import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './css/PaymentSuccess.css';
import { useCart } from './contexts/CartContext';

export default function PaymentSuccess() {
    const location = useLocation();
    const { clearCart } = useCart();
    const { cart, paymentDetails, total } = location.state || { cart: [], paymentDetails: {}, total: 0 };

    // Clear the cart after successful payment
    clearCart();

    return (
        <div className="payment-success-container">
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase, {paymentDetails.name}!</p>
            <h2>Order Summary</h2>
            <div className="order-summary">
                {cart.map((item) => (
                    <div key={item._id} className="order-item">
                        <h3>{item.courseTitle}</h3>
                        <p>Price: $ {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))}
            </div>
            <h3>Total Paid: $ {total}</h3>
            <h2>Payment Details</h2>
            <div className="payment-details">
                <p><strong>Name:</strong> {paymentDetails.name}</p>
                <p><strong>Email:</strong> {paymentDetails.email}</p>
                <p><strong>Card Number:</strong> **** **** **** {paymentDetails.cardNumber.slice(-4)}</p>
            </div>
            <Link to="/courses" className="back-to-courses-btn">Back to Courses</Link>
        </div>
    );
}
