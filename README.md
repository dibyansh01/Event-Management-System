# Event Management System

Welcome to the Event Management System repository! This system allows users to create, manage, and interact with events. Below, you'll find information on the key features, technologies, and how to get started.

## Features

1. **User Authentication:** Users can sign up, log in, and deactivate their accounts. Passwords are securely hashed using bcrypt.

2. **Event Operations:** CRUD operations for events, including creation, retrieval, update, deactivation, and deletion.

3. **Ticket Management:** Users can purchase tickets for events, and the system supports various ticket types.

4. **Comment System:** Users can add comments to events, and comments can be updated or deleted.

5. **Rating System:** Users can rate events on a scale of 1 to 5, and the system provides average ratings for each event.

6. **Search Functionality:** Users can search for events based on title, date, or location.

7. **Soft Deletion Strategy:** Events and users are not removed from the database but are marked as inactive. And deactivated events are excluded from search results.

8. **Caching:** Responses for the `/events` endpoint are cached for 60 seconds using in-memory caching.

9. **JWT (JSON Web Token) Authentication:** Token-based authentication to secure API endpoints.

10. **Swagger Documentation:** API documentation is available using Swagger UI at the `/api-docs` endpoint.

11. **Indexing:** MongoDB indexes are applied to the events collection for efficient text search, sorting, and filtering.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (Password hashing)
- JSON Web Tokens (JWT) for authentication
- Swagger UI for API documentation
- In-memory caching for improved performance

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/event-management-system.git
   
2. **Install Dependencies:**
    ```bash
   cd event-management-system
   npm install
  
3. **Set Environment Variables:**
    ```bash
   database=your_mongoDB_connection_string
   SECRET=your_jwt_secret
  
4. **Run the Application:**
    ```bash
   npm start
  The application will be accessible at http://localhost:3000
  
# API Documentation

## Authentication

### Sign Up
- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
- **Response:**
   ```json
  {
    "message": "User created successfully",
    "token": "string"
  }

 ### LogIn
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Log in with existing credentials.
- **Request Headers:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
- **Response:**
   ```json
  {
    "message": "Logged in successfully",
    "token": "string"
  }
   
 ### Deactivate User
- **URL:** `/users/deactivate`
- **Method:** `PUT`
- **Description:** Deactivate the authenticated user's account.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Response:**
   ```json
  {
   "message": "User deactivated successfully"
  }

 ## Events

 ### Create Event
- **URL:** `/events`
- **Method:** `POST`
- **Description:** Create a new event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Request Body:**
  ```json
  {
   "title": "string",
  "description": "string",
  "date": "string (ISO 8601 date format)",
  "time": "string",
  "location": "string"
  }
- **Response:**
   ```json
  {
    "message": "Event created successfully",
    "event": { "event_object" }
  }

### Get All Events
- **URL:** `/events`
- **Method:** `GET`
- **Description:** Get all events.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Response:**
   ```json
  [
    { "event_object1" },
    { "event_object2" },
  ...
  ]

 ### Get Event Details
- **URL:** `/events/:eventId`
- **Method:** `GET`
- **Description:** Get details of a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Response:**
   ```json
  {
    "event_object"
  }

### Update Event
- **URL:** `/events/:eventId`
- **Method:** `PUT`
- **Description:** Update details of a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Request Body:**
  ```json
  {
   "title": "string",
  "description": "string",
  "date": "string (ISO 8601 date format)",
  "time": "string",
  "location": "string"
  }
- **Response:**
   ```json
  {
    "message": "Event updated successfully",
     "event": { "updated_event_object" }
  }

### Deactivate Event
- **URL:** `/events/:eventId/deactivate`
- **Method:** `PUT`
- **Description:** Deactivate a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Response:**
   ```json
  {
   "message": "Event deactivated successfully"
  }


 ### Delete Event
- **URL:** `/events/:eventId`
- **Method:** `DELETE`
- **Description:** Delete a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Response:**
   ```json
  {
    "message": "Event deleted successfully"
  }


## Tickets, Comments, Ratings (Similar structure as Events)

## Swagger UI
Swagger UI is available at http://localhost:3000/api-docs for detailed API documentation.

