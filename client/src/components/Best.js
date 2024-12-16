import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Best.css';
import axios from 'axios';
// Importing functions
import { moveRight, moveLeft } from './UTILS.js';

// Importing images
import arrowImage from './img/arrow.png';
import placeholderImage from '../../../client/src/components/img/404.png';

export default function Best() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // Function to fetch courses from API
    const fetchCourses = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/course/best'); // Adjust the API endpoint as needed

            setCourses(response.data.courses);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleClick = (data) => {
        navigate("/Detail", { state: data });
      };
    

    const calculateDiscount = (price, actualPrice) => {
        return Math.round(((actualPrice - price) / actualPrice) * 100);
    };

    if (loading) {
        return <div>Loading courses...</div>;
    }

    return (
        <div>
            <section className="product">
                <h2 className="product-category">Best Selling Tech Courses</h2>

                <button className="pre-btn" onClick={moveLeft}>
                    <img src={arrowImage} alt="Move left" />
                </button>
                <button className="nxt-btn" onClick={moveRight}>
                    <img src={arrowImage} alt="Move right" />
                </button>

                <div className="product-container">
                    {courses.map((course) => (
                        <div className="product-card" key={course._id}>
                            <div className="product-image">
                                <span className="discount-tagb">
                                    {calculateDiscount(course.price, course.actualPrice)}% off
                                </span>
                                <img
                                    src={course.image || placeholderImage}
                                    className="product-thumb"
                                    alt={course.courseTitle}
                                />
                                
                            </div>
                            <div onClick={() => handleClick(course)} style={{ textDecoration: 'none' }}>
                                <div className="product-info">
                                    <h2 className="product-brand">{course.courseTitle}</h2>
                                    <p className="product-short-des">{course.overview}</p>
                                    <span className="instructor">
                                        Instructor: {course.creatorName}
                                    </span>
                                    <div className="price-info">
                                        <span className="price">${course.price.toFixed(2)}</span>
                                        <span className="actual-price">
                                            ${course.actualPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
