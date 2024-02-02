const express = require('express');
const mongoose = require('mongoose');

const {authenticateJwt, } = require('../middleware/auth.js')
const {cacheMiddleware} = require('../middleware/cache.js')
const { Event, Rating} = require('../db/db.js')


const router = express.Router();
  
// CRUD operations for Events

// Create an event
router.post('/', authenticateJwt, cacheMiddleware(60), async (req, res) => {  //inMemory-cache
    try {
        
      const { title, description, date, time, location } = req.body;
      const organizer = req.user._id // UserId as the organizer
  
      // Create a new event
      const newEvent = new Event({ title, description, date, time, location, organizer });
      await newEvent.save();
  
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      res.status(400).json({ message: 'Invalid input data', errors: error });
    }
  });
  

// Get all events
router.get('/',authenticateJwt, async (req, res) => {
try {
    const events = await Event.find({ isActive: true });
    res.json(events);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

// Get details of a single event
router.get('/:eventId', authenticateJwt, async (req, res) => {
try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
    return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

// Update an event
router.put('/:eventId', authenticateJwt, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, description, date, time, location } = req.body;
    
    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the authenticated user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Permission denied. You are not the organizer of this event.' });
    }

    // Update event fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;

    // Save the updated event
    await event.save();

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input data', errors: error.errors });
  }
});

// Endpoint to deactivate an event
router.put('/:eventId/deactivate', authenticateJwt, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the authenticated user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Permission denied. You are not the organizer of this event.' });
    }

    event.isActive = false;
    await event.save();

    res.json({ message: 'Event deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an event
router.delete('/:eventId', authenticateJwt, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the authenticated user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Permission denied. You are not the organizer of this event.' });
    }

    // Delete the event from the database
    await Event.deleteOne({ _id: eventId });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Search events by title, date, or location

router.get("/search", authenticateJwt, async (req, res) => {
    const { title, date, location } = req.query;
    console.log(location)
  
    try {
      // Construct the search query based on provided parameters
      const searchQuery = {};
  
      if (title) {
        searchQuery.title = { $regex: title, $options: 'i' };
      }
  
      if (date) {
        searchQuery.date = { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) };
      }
  
      if (location) {
        searchQuery.location = { $regex: location, $options: 'i' };
      }
  
      console.log('MongoDB Query:', searchQuery);
  
      const searchResults = await Event.find(searchQuery);
  
      return res.status(200).json({ message: 'Event search results', events: searchResults });
    } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  });
  
// Rate an event
router.post('/:eventId/rate', authenticateJwt, async (req, res) => {
    try {
      const { eventId } = req.params;
      const { rating } = req.body;
      const user = req.user._id;
  
      // Check if the user has already rated the event
      const existingRating = await Rating.findOne({ user, event: eventId });
  
      if (existingRating) {
        return res.status(400).json({ message: 'You have already rated this event' });
      }
  
      // Create a new rating
      const newRating = new Rating({ user, event: eventId, rating });
      await newRating.save();
  
      res.status(201).json({ message: 'Event rated successfully', rating: newRating });
    } catch (error) {
      res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
});

// Get average rating for an event
router.get('/:eventId/rating', authenticateJwt, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        
        const averageRating = await Rating.aggregate([
            { $match: { event: new mongoose.Types.ObjectId(eventId) } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } },
        ]);

        //console.log('Average Rating:', averageRating);

        if (averageRating.length === 0) {
            return res.status(404).json({ message: 'No ratings found for the event' });
        }

        res.json({ averageRating: averageRating[0].averageRating });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


