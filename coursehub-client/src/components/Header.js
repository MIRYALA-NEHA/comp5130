import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import './Header.css';

const Header = () => (
  <header className="site-header">
    <h1>CourseHub</h1>
    <nav>
      <ul>
        <li><NavLink exact to="/" activeClassName="active-link">Home</NavLink></li>
        <li><NavLink to="/courses" activeClassName="active-link">Courses</NavLink></li>
        <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
