import Course from '../models/course.js';
import logger from '../middlewares/logger.js';  // Ensure you have this imported

// Register a new course
export const registerCourse = async (req, res) => {
    try {
        const {
            courseTitle,
            price,
            actualPrice,
            overview,
            creatorName,
            creatorEmail,
            description,
            image,
            category,
            duration,
        } = req.body;

        // Log the attempt to register a course
        logger.info(`Attempting to register new course: ${courseTitle} by ${creatorName}`);

        // Create a new course instance
        const newCourse = new Course({
            courseTitle,
            price,
            actualPrice,
            overview,
            creatorName,
            creatorEmail,
            description,
            image,
            category,
            duration,
        });

        // Save to database
        await newCourse.save();
        logger.info(`Course registered successfully: ${courseTitle}`);

        res.status(201).json({
            success: true,
            message: 'Course registered successfully!',
            course: newCourse,
        });
    } catch (error) {
        logger.error(`Failed to register course: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Failed to register course',
            error: error.message,
        });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        logger.info("Fetching all courses from the database");
        const courses = await Course.find();
        logger.info("All courses fetched successfully");

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        logger.error(`Failed to fetch all courses: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses',
            error: error.message,
        });
    }
};

// Get top 5 sold courses
export const getTopSoldCourses = async (req, res) => {
    try {
        logger.info("Fetching top 5 sold courses");
        const topCourses = await Course.find()
            .sort({ sold: -1 }) // Sort courses by 'sold' in descending order
            .limit(5); // Limit the results to the top 5

        logger.info("Top sold courses fetched successfully");

        res.status(200).json({
            success: true,
            courses: topCourses,
        });
    } catch (error) {
        logger.error(`Failed to fetch top sold courses: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch top sold courses',
            error: error.message,
        });
    }
};

// Get a course by ID
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`Fetching course with ID: ${id}`);
        const course = await Course.findById(id);

        if (!course) {
            logger.warn(`Course not found with ID: ${id}`);
            return res.status(404).json({
                success: false,
                message: 'Course not found',
            });
        }

        logger.info(`Course fetched successfully: ${course.courseTitle}`);
        res.status(200).json({
            success: true,
            course,
        });
    } catch (error) {
        logger.error(`Failed to fetch course with ID ${req.params.id}: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch course',
            error: error.message,
        });
    }
};
