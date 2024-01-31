const mongoose = require('mongoose');

// Events Collection
const eventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },  
    time: { type: String, default: new Date().toLocaleTimeString() },  
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }, // Added field for soft deletion
});

// Adding indexing to eventsSchema
eventsSchema.index({ title: 'text' }); 
eventsSchema.index({ date: 1 }); 
eventsSchema.index({ location: 'text' }); 
eventsSchema.index({ organizer: 1 }); 


// Tickets Collection
const ticketsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    ticketType: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Comments Collection
const commentsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ratingsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    timestamp: { type: Date, default: Date.now },
  });
  

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true }, 
});


// MongoDB Models
const Event = mongoose.model('Event', eventsSchema);
const Ticket = mongoose.model('Ticket', ticketsSchema);
const Comment = mongoose.model('Comment', commentsSchema);
const Rating = mongoose.model('Rating', ratingsSchema);
const User = mongoose.model('User', usersSchema);


module.exports = {
    Event,
    Ticket,
    Comment,
    Rating,
    User
}