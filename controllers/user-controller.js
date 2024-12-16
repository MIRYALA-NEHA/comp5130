import User from '../models/user.js'; // Assuming you have a User model
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import bcrypt from 'bcrypt'; // For password hashing
import dotenv from 'dotenv'; // For environment variables
import logger from '../middlewares/logger.js'; // Import the custom logger

dotenv.config();

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Handle user signup
export const handleSignUp = async (req, res) => {
    try {
        const { name, email, profession, password } = req.body;

        logger.debug('Received signup request with data: ', req.body);

        // Input validation
        if (!email || !password) {
            logger.warn('Signup attempt without email or password');
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`Signup attempt with existing email: ${email}`);
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, profession, password: hashedPassword });
        await newUser.save();

        logger.info('New user registered successfully: ' + email);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        logger.error('Error in signup process: ', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Handle user login
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        logger.debug('Login attempt for email: ' + email);

        // Input validation
        if (!email || !password) {
            logger.warn('Login attempt without email or password');
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`No user found with email: ${email}`);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn('Invalid password attempt for email: '+ email);
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token
        // const token = generateToken(user);
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info('Login successful for user: '+ email);
        res.status(200).json({ success: true, token, message: 'Login successful' });
    } catch (error) {
        logger.error('Error in login process: ', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Get user profile
export const handleProfile = async (req, res) => {
    try {
        const { email } = req.body;

        logger.debug('Profile request received for email: '+ email);

        // Input validation
        if (!email) {
            logger.warn('Profile request without email');
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`No user found with email: ${email}`);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        logger.info('User profile retrieved: ', user);
        res.status(200).json({ success: true, user });
    } catch (error) {
        logger.error('Error in retrieving profile: ', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Handle user signup
export const updateProfile = async (req, res) => {
    try {
        const { email, name, profession } = req.body;

        logger.debug('Profile update request for email: '+ email);

        // Input validation
        if (!name) {
            logger.warn('Profile update attempt without name');
            return res.status(400).json({ success: false, message: 'Name is required' });
        }

        // Find user by email and update the fields
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, profession }, // Fields to update
            { new: true, runValidators: true } // Return the updated document and validate changes
        );

        if (!updatedUser) {
            logger.warn(`No user found with email: ${email} during profile update`);
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        logger.info('User profile updated successfully: '+email);
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
        });

    } catch (error) {
        logger.error('Failed to update profile: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message,
        });
    }
};

// Add a new user
export const addUser = async (req, res) => {
    try {
        const { sub, ...rest } = req.body;

        logger.debug('Attempt to add new user with sub: ', sub);

        // Check if user exists
        const exist = await User.findOne({ sub });
        if (exist) {
            logger.warn('Attempt to add existing user with sub: ', sub);
            return res.status(200).json({ success: false, message: 'User already exists' });
        }

        // Save the new user
        const newUser = new User({ sub, ...rest });
        await newUser.save();

        logger.info('New user added successfully: '+email);
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        logger.error('Error in adding new user: ', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        logger.info('Retrieved all users');
        res.status(200).json({ success: true, users });
    } catch (error) {
        logger.error('Error in retrieving users: '+error.message);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
