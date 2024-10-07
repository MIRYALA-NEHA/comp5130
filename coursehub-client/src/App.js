import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Courses from './components/Courses';
import About from './components/About';
import Course1 from './components/Course1';  // Import Course1 component
import Course2 from './components/Course2';  // Import Course2 component
import Course3 from './components/Course3';  // Import Course3 component
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses/1" element={<Course1 />} />  {/* Add route for Course1 */}
          <Route path="/courses/2" element={<Course2 />} />  {/* Add route for Course2 */}
          <Route path="/courses/3" element={<Course3 />} />  {/* Add route for Course3 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
