// models/Blog.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'your_username',  // Replace with your PostgreSQL username
  password: 'your_password',  // Replace with your PostgreSQL password
  database: 'blognest',
});

const Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Referring to the User model (assuming foreign key relationship)
        key: 'id',
      },
    },
  });

// Syncing the model with the database
sequelize.sync();

module.exports = Blog;
