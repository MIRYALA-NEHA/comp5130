import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from './contexts/CartContext'; // Import CartContext for dynamic cart count
import './css/Navbar.css';
import Logo from './Logo';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { cart } = useCart(); // Access cart from CartContext
    const navigate = useNavigate();

    // Calculate total items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/courses?query=${searchQuery}`);
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav"><div><Logo /></div>
                    <div className="nav-items">                        
                        <div className="search">
                            <input
                                type="text"
                                className="search-box"
                                placeholder="Search courses, topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="search-btn" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                        <Link to="/Profile">
                            <img
                                className="userImg"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRDaSp_olEwcOQkyyelmIczJtJNmlC8HDXw&s"
                                alt="User Profile"
                            />
                        </Link>
                        <Link to="/Cart">
                            <div className="cart-icon-container">
                                <img
                                    className="cartImg"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6gGcAMEB4fwNBq4bzX2P07oeeDu0r6rWyQ&s"
                                    alt="Cart"
                                />
                                <span className="cart-count">{totalItems}</span> {/* Dynamic cart count */}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            <ul className="links-container">
                <li className="link-item">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                        Home
                    </NavLink>
                </li>
                <li className="link-item">
                    <NavLink to="/Courses" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                        Courses
                    </NavLink>
                </li>
                <li className="link-item">
                    <NavLink to="/IDE" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                        IDE
                    </NavLink>
                </li>
                <li className="link-item">
                    <NavLink to="/About" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                        About
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
