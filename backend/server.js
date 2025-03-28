const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Import the blog routes
const blogRoutes = require('./routes/blogRoutes');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use('/api/users', userRoutes);

// Use the blog routes
app.use('/api/blogs', blogRoutes);

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Welcome to BlogNest!');
});

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
