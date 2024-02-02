const express = require('express');

const {authenticateJwt,} = require('../middleware/auth.js')
const {Ticket} = require('../db/db.js')

const router = express.Router();

// operations for Tickets

// Purchase a ticket
router.post('/', authenticateJwt, async (req, res) => {
try {
    const { eventId, ticketType, price, quantity } = req.body;
    const user = req.user._id;

    // Create a new ticket
    const newTicket = new Ticket({ user, event: eventId, ticketType, price, quantity });
    await newTicket.save();

    res.status(201).json({ message: 'Ticket purchased successfully', ticket: newTicket });
} catch (error) {
    res.status(400).json({ message: 'Invalid input data', errors: error.errors });
}
});

// Get all tickets of the authenticated user
router.get('/', authenticateJwt, async (req, res) => {
try {
    const userId = req.user._id;
    const tickets = await Ticket.find({ user: userId });
    res.json(tickets);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

module.exports = router;



