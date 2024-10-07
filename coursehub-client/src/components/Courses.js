import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Courses.css';  // Link to the CSS file

const Courses = () => (
  <section id="courses" className="courses-section">
    <h2>Courses Offered</h2>
    <div className="courses-list">
      <div className="course-card">
        <Link to="/courses/1">Course 1: Introduction to Data Structures</Link>
      </div>
      <div className="course-card">
        <Link to="/courses/2">Course 2: Advanced Algorithms</Link>
      </div>
      <div className="course-card">
        <Link to="/courses/3">Course 3: Database Management</Link>
      </div>
    </div>
  </section>
);

export default Courses;
