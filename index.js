const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

const userRoutes = require('./routes/authentication.js')
const eventRoutes = require('./routes/events.js')
const commentRoutes = require('./routes/comments.js')
const ticketRoutes = require('./routes/tickets.js')
const searchRoute = require('./routes/search.js')
const specs = require('./swaggerConfig.js');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.database || ''

mongoose.connect(mongoURI, {dbName: "CourseApp"})

//swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/comments', commentRoutes);
app.use('/tickets', ticketRoutes);
app.use('/search', searchRoute);

app.listen(3000, ()=>{
    console.log("listening to port 3000")
})



