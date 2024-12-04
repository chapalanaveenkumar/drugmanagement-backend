const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user profile (protected route)
router.get('/profile', protect, getUserProfile);

module.exports = router;
