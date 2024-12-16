import React from 'react';
import './css/Cart.css';
import { useCart } from './contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Navigate to the Checkout page with cart data
        navigate('/checkout', { state: { cart, total: calculateTotal() } });
    };

    if (cart.length === 0) {
        return (
            <div>
                <div className="cart-container">
                    <h1>Your Cart is Empty</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="cart-container">
                <h1>Your Cart</h1>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image || '/path-to-default-image.png'} alt={item.courseTitle} />
                            <div className="cart-item-details">
                                <h2>{item.courseTitle}</h2>
                                <p>{item.overview}</p>
                                <p>Price: $ {item.price}</p>
                                <div className="cart-item-quantity">
                                    <button
                                        onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item._id)}
                                    aria-label={`Remove ${item.courseTitle}`}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Total: $ {calculateTotal()}</h2>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                    <button className="clear-btn" onClick={clearCart} disabled={cart.length === 0}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
