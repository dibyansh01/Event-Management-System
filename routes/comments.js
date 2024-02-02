const express = require('express');

const {authenticateJwt,} = require('../middleware/auth.js')
const { Comment} = require('../db/db.js')

const router = express.Router();

// operations for Comments

// Add a comment
router.post('/', authenticateJwt, async (req, res) => {
try {
    const { eventId, text } = req.body;
    const user = req.user._id;

    // Create a new comment
    const newComment = new Comment({ user, event: eventId, text });
    await newComment.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
} catch (error) {
    res.status(400).json({ message: 'Invalid input data', errors: error.errors });
}
});

// Update a comment
router.put('/:commentId', authenticateJwt, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the authenticated user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You cannot update this comment' });
    }

    // Update comment text
    comment.text = text || comment.text;

    // Save the updated comment
    await comment.save();

    res.json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input data', errors: error.errors });
  }
});

// Delete a comment
router.delete('/:commentId', authenticateJwt, async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the authenticated user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You cannot delete this comment' });
    }

    // Delete the comment from the database
    await Comment.deleteOne({ _id: commentId });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
  

// Get all comments for a specific event
router.get('/:eventId', authenticateJwt, async (req, res) => {
try {
    const eventId = req.params.eventId;
    const comments = await Comment.find({ event: eventId });
    res.json(comments);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

module.exports = router;



