const express = require('express');

const {authenticateJwt} = require('../middleware/auth.js')
const { Event} = require('../db/db.js')

const router = express.Router();

// Search events by title, date, or location
router.get("/", authenticateJwt, async (req, res) => {
    const { title, date, location } = req.query;
  
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
  
      const searchResults = await Event.find(searchQuery);
     
      return res.status(200).json({ message: 'Event search results', events: searchResults });
    } catch (error) {
     
      console.error('Error:', error);
      return res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});
  

module.exports = router;



