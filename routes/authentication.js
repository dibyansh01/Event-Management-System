const express = require('express');
const bcrypt = require('bcrypt')
const { z } = require('zod');
const jwt = require('jsonwebtoken')

const {authenticateJwt, SECRET} = require('../middleware/auth.js')
const {User} = require('../db/db.js')
const router = express.Router();

const usernameSchema = z.string().min(3).max(50);
const passwordSchema = z.string().min(3).max(50);


router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input data using Zod
        usernameSchema.parse(username);
        passwordSchema.parse(password);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(403).json({ message: 'User already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({ _id: newUser._id, username: newUser.username, role: 'user' }, SECRET, { expiresIn: '24h' });
            res.json({ message: 'User created successfully', token });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.headers;

    const user = await User.findOne({ username });
    if (user) {
        // Compare the provided password with the stored hashed password
        const passwordMatch = bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ _id: user._id, username: user.username, role: 'user' }, SECRET, { expiresIn: '24h' });
            res.json({ message: 'Logged in successfully', token });
        } else {
            res.status(403).json({ message: 'Invalid username or password' });
        }
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});


// Endpoint to deactivate a user (The user can only deactivate themselves, not any other user.)
router.put('/deactivate', authenticateJwt, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(userId, { isActive: false });

        if (user) {
            res.json({ message: 'User deactivated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;




