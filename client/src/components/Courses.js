import './css/Courses.css'; // Dedicated CSS for Courses component
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Courses() {
  const [courseData, setCourseData] = useState([]); // Original course data
  const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses to display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  const getData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+"/course/");
      setCourseData(response.data.courses);
      setFilteredCourses(response.data.courses); // Initialize filtered courses
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter courses whenever searchQuery or courseData changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courseData); // Show all courses if search is empty
    } else {
      const filtered = courseData.filter((course) =>
        course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courseData]);

  const handleClick = (data) => {
    navigate("/Detail", { state: data });
  };

  const calculateDiscount = (price, actualPrice) => {
    if (!price || !actualPrice || actualPrice <= 0) return 0;
    return ((actualPrice - price) / actualPrice * 100).toFixed(2);
  };

  if (loading) {
    return <div className="courses-loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="courses-error">Error loading courses: {error}</div>;
  }

  return (
    <div>
      <div className="courses-container">        
        {searchQuery ? <h2>Results for "{searchQuery}"</h2>:<h2>All Courses</h2>}
        <ul className="courses-list">
          {filteredCourses.map((data) => (
            <li key={data._id} className="course-item">
              <div className="product-card">
                <div className="product-image">
                  <span className="discount-tag">{calculateDiscount(data.price, data.actualPrice)}% off</span>
                  <img src={data.image || 'default-image.png'} className="product-thumb" alt="Course Thumbnail" />
                  
                </div>
                <div className="product-info" onClick={() => handleClick(data)}>
                  <h2 className="product-title">{data.courseTitle}</h2>
                  <p className="product-overview">{data.overview || 'No overview available'}</p>
                  <div className="price-section">
                    <span className="price">$ {data.price}</span>
                    <span className="actual-price">$ {data.actualPrice}</span>
                  </div>
                  <p className="product-creator">Creator: {data.creatorName}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredCourses.length === 0 && <div className="no-results">No courses found for "{searchQuery}"</div>}
      </div>
    </div>
  );
}
