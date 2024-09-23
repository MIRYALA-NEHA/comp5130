const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
  },
  password: {
    type: String,
    required: true, // This will be hashed before storing
  }
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
