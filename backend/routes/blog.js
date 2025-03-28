const express = require('express');
const Blog = require('../models/Blog');
const { useAuth } = require('../contexts/AuthContext'); // Assuming you're using the AuthContext

const router = express.Router();

// Route to create a new blog
router.post('/api/blogs', async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Get user id from JWT token

  try {
    const newBlog = await Blog.create({ title, content, userId });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// Route to get all blogs
router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blogs' });
  }
});

// Route to update a blog
router.put('/api/blogs/:id', async (req, res) => {
  const { title, content } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog' });
  }
});

// Route to delete a blog
router.delete('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await blog.destroy();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router;
