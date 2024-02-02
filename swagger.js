
/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Get Swagger documentation
 *     description: Retrieve Swagger documentation for the API.
 *     responses:
 *       '200':
 *         description: Swagger documentation.
 */


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with a unique username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       expected:
 *                         type: string
 *                       received:
 *                         type: string
 *                       path:
 *                         type: array
 *                       message:
 *                         type: string
 *       '403':
 *         description: User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Log in a user with a valid username and password.
 *     parameters:
 *       - in: header
 *         name: username
 *         description: The username of the user.
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: password
 *         description: The password of the user.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Logged in successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *       '403':
 *         description: Invalid username or password.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */



// Endpoint to deactivate a user (The user can only deactivate themselves, not any other user.)
/**
 * @swagger
 * /users/deactivate:
 *   put:
 *     summary: Deactivate a user
 *     description: Deactivate the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deactivated successfully.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal Server Error.
 */

// CRUD operations for Events

// Create an event
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create an event
 *     description: Create a new event with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Event created successfully.
 *       '400':
 *         description: Invalid input data.
 */

// Get all events
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of events.
 *       '500':
 *         description: Internal Server Error.
 */

// Get details of a single event
/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Get details of an event
 *     description: Retrieve details of a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       '200':
 *         description: Event details.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal Server Error.
 */

// Update an event
/**
 * @swagger
 * /events/{eventId}:
 *   put:
 *     summary: Update an event
 *     description: Update the details of a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event updated successfully.
 *       '400':
 *         description: Invalid input data.
 *       '404':
 *         description: Event not found.
 */

// Endpoint to deactivate an event
/**
 * @swagger
 * /events/{eventId}/deactivate:
 *   put:
 *     summary: Deactivate an event
 *     description: Deactivate a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       '200':
 *         description: Event deactivated successfully.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal Server Error.
 */

// Delete an event
/**
 * @swagger
 * /events/{eventId}:
 *   delete:
 *     summary: Delete an event
 *     description: Delete a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       '200':
 *         description: Event deleted successfully.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal Server Error.
 */

// ... Add Swagger annotations to other routes similarly

// Search events by title, date, or location
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search events
 *     description: Search events based on title, date, or location.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title to search for.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to search for.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location to search for.
 *     responses:
 *       '200':
 *         description: Event search results.
 *       '500':
 *         description: Internal Server Error.
 */

// Rate an event
/**
 * @swagger
 * /events/{eventId}/rate:
 *   post:
 *     summary: Rate an event
 *     description: Rate a specific event by providing its ID and the rating.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Event rated successfully.
 *       '400':
 *         description: Invalid input data.
 */

// Get average rating for an event
/**
 * @swagger
 * /events/{eventId}/rating:
 *   get:
 *     summary: Get average rating for an event
 *     description: Get the average rating for a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       '200':
 *         description: Average rating for the event.
 *       '404':
 *         description: No ratings found for the event.
 *       '500':
 *         description: Internal Server Error.
 */

// ... Add Swagger annotations to other routes similarly

// Endpoint to purchase a ticket
/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Purchase a ticket
 *     description: Purchase a ticket for a specific event.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               ticketType:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Ticket purchased successfully.
 *       '400':
 *         description: Invalid input data.
 */

// Get all tickets of the authenticated user
/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve all tickets purchased by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of tickets.
 *       '500':
 *         description: Internal Server Error.
 */

// CRUD operations for Comments

// Add a comment
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a comment
 *     description: Add a comment to a specific event.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment added successfully.
 *       '400':
 *         description: Invalid input data.
 */

// Update a comment
/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     description: Update a specific comment by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment updated successfully.
 *       '400':
 *         description: Invalid input data.
 *       '404':
 *         description: Comment not found.
 */

// Delete a comment
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete a specific comment by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment.
 *     responses:
 *       '200':
 *         description: Comment deleted successfully.
 *       '404':
 *         description: Comment not found.
 *       '500':
 *         description: Internal Server Error.
 */

// Get all comments for a specific event
/**
 * @swagger
 * /comments/{eventId}:
 *   get:
 *     summary: Get all comments for an event
 *     description: Retrieve all comments for a specific event by providing its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       '200':
 *         description: List of comments for the event.
 *       '500':
 *         description: Internal Server Error.
 */
