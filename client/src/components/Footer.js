import React from 'react';
import "./css/Footer.css";
import Logo from './Logo';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <Logo alt="CourseHub Logo" />
                <div className="footer-ul-container">
                    {[
                        {
                            title: "Popular Categories",
                            links: [
                                "Web Development", 
                                "Data Science", 
                                "Cybersecurity", 
                                "Cloud Computing", 
                                "Artificial Intelligence", 
                                "DevOps", 
                                "Mobile Development", 
                                "Programming Languages"
                            ]
                        },
                        {
                            title: "Quick Links",
                            links: [
                                "About Us", 
                                "Contact", 
                                "FAQs", 
                                "Blog", 
                                "Help Center", 
                                "Terms of Use", 
                                "Privacy Policy"
                            ]
                        }
                    ].map((category, index) => (
                        <ul key={index} className="category">
                            <li className="category-title">{category.title}</li>
                            {category.links.map((link, idx) => (
                                <li key={idx}><a href="#" className="footer-link">{link}</a></li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
            <div style={{color:"black"}}>
                <p className="footer-title">About CourseHub</p>
                <p className="info">
                    CourseHub is your go-to platform for learning and mastering new skills. 
                    Whether you're looking to dive into web development, data science, or cybersecurity, 
                    we connect you with top-notch instructors and courses designed for every skill level.
                </p>
                <p className="info">
                    Support Emails - <a href="mailto:help@coursehub.com">help@coursehub.com</a>, 
                    <a href="mailto:support@coursehub.com">support@coursehub.com</a>
                </p>
                <p className="info">
                    Telephone - +1 800 123 456, +1 800 654 321
                </p>
                <div className="footer-social-container">
                    <div>
                        <a href="#" className="social-link">Terms & Services</a>
                        <a href="#" className="social-link">Privacy Policy</a>
                    </div>
                    <div>
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">Facebook</a>
                        <a href="#" className="social-link">Twitter</a>
                        <a href="#" className="social-link">LinkedIn</a>
                    </div>
                </div>
                <p className="footer-credit">CourseHub, Empowering Education Online</p>
            </div>
        </footer>
    );
}
