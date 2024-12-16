import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Payment.css';

export default function Payment() {
    const location = useLocation();
    const { cart, total } = location.state || { cart: [], total: 0 }; // Cart data from checkout
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            console.log('Processing payment for cart items:', cart);
            console.log('Payment details:', form);

            // Redirect to confirmation page
            navigate('/payment-success', { state: { cart, paymentDetails: form, total } });
        }, 2000);
    };

    return (
        <div className="payment-container">
            <h1>Checkout</h1>

            {/* Billing Summary */}
            <div className="billing-summary">
                <h2>Order Summary</h2>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <h3>{item.courseTitle}</h3>
                            <p>Price: $ {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <h3>Total: $ {total}</h3>
                </div>
            </div>

            {/* Payment Form */}
            <form className="payment-form" onSubmit={handlePayment}>
                <h2>Payment Details</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleInputChange}
                        maxLength="16"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        name="expiryDate"
                        value={form.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInputChange}
                        maxLength="3"
                        required
                    />
                </div>
                <button type="submit" className="pay-btn" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay $${total}`}
                </button>
            </form>
        </div>
    );
}
