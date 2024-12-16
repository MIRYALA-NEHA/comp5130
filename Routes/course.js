import express from 'express';
import { registerCourse, getAllCourses, getCourseById, getTopSoldCourses } from '../controllers/course.js';
import varifyToken from '../middlewares/verifyToken.js';

const courseRouter = express.Router();

// POST: Register a new course
courseRouter.post('/register', varifyToken, registerCourse);

// GET: Fetch all courses
courseRouter.get('/', getAllCourses);

// GET: Fetch best courses
courseRouter.get('/best', getTopSoldCourses);

// GET: Fetch a single course by ID
courseRouter.get('/:id', getCourseById);

export default courseRouter;
