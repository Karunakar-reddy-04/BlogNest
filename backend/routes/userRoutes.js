const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../models/userModel');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';  // Store this in an environment variable in production

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    if (userModel.findUserByEmail(email)) {
        return res.status(400).send('User already exists');
    }

    // Register the user
    const user = await userModel.registerUser(username, email, password);
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token, user });
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findUserByEmail(email);
    if (!user) return res.status(400).send('Invalid credentials');

    // Check if passwords match
    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, user });
});

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Store user info in request object
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Protect routes using JWT middleware
router.use('/api/blogs', verifyToken);

module.exports = router;
