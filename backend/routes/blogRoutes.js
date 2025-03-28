const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('./routes/userRoutes');



// Mock data for blogs
let blogs = [
    { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog', content: 'This is the second blog post.' }
];

// GET all blogs
router.get('/', (req, res) => {
    res.json(blogs);
});

// GET all blogs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs');
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// GET a single blog by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Blog not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// POST a new blog (protected route)
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// PUT update a blog by ID
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            'UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Blog not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// DELETE a blog by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Blog not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
