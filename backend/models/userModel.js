const bcrypt = require('bcryptjs');

// Mock user database for now
let users = [];

// Helper function to hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Helper function to compare a plain password with the hashed password
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Exported functions to interact with users
module.exports = {
    // Register user
    registerUser: async (username, email, password) => {
        const hashedPassword = await hashPassword(password);
        const user = { id: users.length + 1, username, email, password: hashedPassword };
        users.push(user);
        return user;
    },

    // Find user by email
    findUserByEmail: (email) => {
        return users.find((user) => user.email === email);
    },

    // Compare plain password with stored hash
    comparePassword
};
