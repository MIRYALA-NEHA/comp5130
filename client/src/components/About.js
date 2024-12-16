import React from 'react';
import './css/About.css';

export default function About() {
  return (
    <div>
      <div className="about-container">
        <h1>About CourseHub</h1>
        <p>
          Welcome to <strong>CourseHub</strong>, your one-stop platform for discovering, learning, and sharing knowledge.
          Our mission is to provide high-quality learning opportunities for everyone, everywhere.
        </p>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            At CourseHub, we believe in empowering individuals through education. We strive to bridge the gap between
            learners and experts by creating an accessible and engaging learning ecosystem.
          </p>
        </section>
        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Comprehensive courses on various topics including technology, business, and personal development.</li>
            <li>A vibrant community where learners and educators can interact and share knowledge.</li>
            <li>Tools to track your progress and achieve your learning goals.</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Join Us</h2>
          <p>
            Whether you’re looking to upskill, teach, or explore new fields, CourseHub is here to guide you on your
            journey. Sign up today and start your learning adventure!
          </p>
        </section>
      </div>
    </div>
  );
}
