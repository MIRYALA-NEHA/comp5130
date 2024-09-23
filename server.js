const express = require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('./middleware/auth');
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Load the User model
const User = require('./models/User');

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
  res.send('CourseHub API is running');
});

// Register Route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({ email, password });
  
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user
      let user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Create payload for the token
      console.log(user);
      const payload={
        user:{
            id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h'},
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Profile Route
app.get('/profile', auth,async (req, res) => {
    try {
      const user = await User.findById("66f08ce65ffb9b78147604ef").select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
