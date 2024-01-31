const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const { z } = require('zod');
const jwt = require('jsonwebtoken')
const swaggerUi = require('swagger-ui-express');

const {authenticateJwt, SECRET} = require('./src/middleware/auth.js')
const {cacheMiddleware} = require('./src/middleware/cache.js')
const {User, Event, Ticket, Comment, Rating} = require('./src/db/db.js')
const specs = require('./swaggerConfig.js');


const usernameSchema = z.string().min(3).max(50);
const passwordSchema = z.string().min(3).max(50);

dotenv.config();

const app = express();

app.use(express.json());

const mongoURI = process.env.database || ''


mongoose.connect(mongoURI, {dbName: "CourseApp"})


//swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.post('/signup', async (req, res) => {
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


app.post('/login', async (req, res) => {
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
app.put('/users/deactivate', authenticateJwt, async (req, res) => {
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

  
// CRUD operations for Events

// Create an event
app.post('/events', authenticateJwt, cacheMiddleware(60), async (req, res) => {  //inMemory-cache
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
app.get('/events',authenticateJwt, async (req, res) => {
try {
    const events = await Event.find();
    res.json(events);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

// Get details of a single event
app.get('/events/:eventId', authenticateJwt, async (req, res) => {
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
app.put('/events/:eventId', authenticateJwt, async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const { title, description, date, time, location } = req.body;
      
      // Find the event by ID
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
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
app.put('/events/:eventId/deactivate', authenticateJwt, async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.isActive = false;
      await event.save();
  
      res.json({ message: 'Event deactivated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Delete an event
app.delete('/events/:eventId', authenticateJwt, async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      // Find the event by ID
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Delete the event from the database
      await Event.deleteOne({ _id: eventId });
  
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// operations for Tickets

// Purchase a ticket
app.post('/tickets', authenticateJwt, async (req, res) => {
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
app.get('/tickets', authenticateJwt, async (req, res) => {
try {
    const userId = req.user._id;
    const tickets = await Ticket.find({ user: userId });
    res.json(tickets);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

// operations for Comments

// Add a comment
app.post('/comments', authenticateJwt, async (req, res) => {
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
app.put('/comments/:commentId', authenticateJwt, async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { text } = req.body;
  
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
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
app.delete('/comments/:commentId', authenticateJwt, async (req, res) => {
    try {
      const commentId = req.params.commentId;
  
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Delete the comment from the database
      await Comment.deleteOne({ _id: commentId });
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
  

// Get all comments for a specific event
app.get('/comments/:eventId', authenticateJwt, async (req, res) => {
try {
    const eventId = req.params.eventId;
    const comments = await Comment.find({ event: eventId });
    res.json(comments);
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

// Search events by title, date, or location
app.get("/search", authenticateJwt, async (req, res) => {
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
  
// Rate an event
app.post('/events/:eventId/rate', authenticateJwt, async (req, res) => {
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
app.get('/events/:eventId/rating', authenticateJwt, async (req, res) => {
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

app.listen(3000, ()=>{
    console.log("listening to port 3000")
})



