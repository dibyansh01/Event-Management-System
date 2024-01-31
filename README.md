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
     "username": "human",
    "password": "human123"
  }
- **Response:**
   ```json
  {
    "message": "User created successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJhYjA4ODQ4NDRhN2Q2YjVkYzU2ODUiLCJ1c2VybmFtZSI6Imh1bWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDY3MzM3MDQsImV4cCI6MTcwNjgyMDEwNH0.NwDlW-7bcvXbgLgEjkzuX6VOYkFV7o5ZfU9pxTiOflo"
  }

 ### LogIn
- **URL:** `/login`
- **Method:** `POST`
- **Description:** Log in with existing credentials.
- **Request Headers:**
  ```json
  {
    "username": "human",
    "password": "human123"
  }
- **Response:**
   ```json
  {
    "message": "Logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJhYjA4ODQ4NDRhN2Q2YjVkYzU2ODUiLCJ1c2VybmFtZSI6Imh1bWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDY3MzM4MDIsImV4cCI6MTcwNjgyMDIwMn0.mh9e6AX6NfEYPTFhJS-xfpNpOE-fd3RmjQ3RUrLbSfc"
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
   "title": "Carnival2",
  "description": "NewEve",
  "location": "Mumbai"
  }
- **Response:**
   ```json
  {
     "message": "Event created successfully",
    "event": {
        "title": "Carnival2",
        "description": "NewEve",
        "date": "2024-01-31T20:40:13.862Z",
        "time": "2:02:24 AM",
        "location": "Mumbai",
        "organizer": "65b9ff5f074114a0ec6362d6",
        "isActive": true,
        "_id": "65bab02d4844a7d6b5dc5682",
        "__v": 0
    }
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
    {
        "_id": "65ba520e0b4071a524b1eca9",
        "title": "carnival",
        "description": "neweve",
        "date": "2024-01-31T13:58:38.255Z",
        "time": "7:27:12 PM",
        "location": "goa",
        "organizer": "65b9ff5f074114a0ec6362d6",
        "isActive": true,
        "__v": 0
    },
    {
        "_id": "65ba98fa0c16aec279b58ff8",
        "title": "string",
        "description": "string",
        "date": "2024-01-31T00:00:00.000Z",
        "time": "string",
        "location": "string",
        "organizer": "65b9ff5f074114a0ec6362d6",
        "isActive": true,
        "__v": 0
    },
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
     "_id": "65ba520e0b4071a524b1eca9",
    "title": "carnival",
    "description": "neweve",
    "date": "2024-01-31T13:58:38.255Z",
    "time": "7:27:12 PM",
    "location": "goa",
    "organizer": "65b9ff5f074114a0ec6362d6",
    "isActive": true,
    "__v": 0
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
   "title": "carnival3",
  "description": "republicday",
  "location": "delhi"
  }
- **Response:**
   ```json
  {
     "message": "Event updated successfully",
    "event": {
        "_id": "65bab02d4844a7d6b5dc5682",
        "title": "carnival3",
        "description": "republicday",
        "date": "2024-01-31T20:40:13.862Z",
        "time": "2:02:24 AM",
        "location": "delhi",
        "organizer": "65b9ff5f074114a0ec6362d6",
        "isActive": true,
        "__v": 0
    }
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


 ## Tickets

 ### Purchase Ticket
- **URL:** `/tickets`
- **Method:** `POST`
- **Description:** Purchase a ticket for an event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Request Body:**
  ```json
  {
   "eventId": "65ba520e0b4071a524b1eca9",
    "ticketType": "Premium",
    "price": "50",
    "quantity": "2"
  }
- **Response:**
   ```json
  {
    "message": "Ticket purchased successfully",
    "ticket": {
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65ba520e0b4071a524b1eca9",
        "ticketType": "Premium",
        "price": 50,
        "quantity": 2,
        "_id": "65baafb64844a7d6b5dc5680",
        "__v": 0
    }
  }

 ### Get User's Tickets
- **URL:** `/tickets`
- **Method:** `GET`
- **Description:** Get all tickets purchased by the authenticated user.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
  
- **Response:**
   ```json
  {
    {
        "_id": "65ba0ee340a6d9b83563449b",
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65ba0d8c40a6d9b835634498",
        "ticketType": "open",
        "price": 50,
        "quantity": 10,
        "__v": 0
    },
    {
        "_id": "65baafb64844a7d6b5dc5680",
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65ba520e0b4071a524b1eca9",
        "ticketType": "Premium",
        "price": 50,
        "quantity": 2,
        "__v": 0
    }
  }

 ## Comments

 ### Add Comment
- **URL:** `/comments`
- **Method:** `POST`
- **Description:** Add a comment to an event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Request Body:**
  ```json
  {
    "eventId": "65bab02d4844a7d6b5dc5682",
    "text": "Great event"
  }
- **Response:**
   ```json
  {
    "message": "Comment added successfully",
    "comment": {
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65bab02d4844a7d6b5dc5682",
        "text": "Great event",
        "_id": "65bab533c4c3a29d2783a318",
        "timestamp": "2024-01-31T21:01:39.514Z",
        "__v": 0
    }
  }

 ### Update Comment
- **URL:** `/comments/:commentId`
- **Method:** `PUT`
- **Description:** Update a comment.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
  
- **Request Body:**
   ```json
  {
    "text": "updated Great event"
  }
- **Response:**
   ```json
  {
     "message": "Comment updated successfully",
    "comment": {
        "_id": "65bab533c4c3a29d2783a318",
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65bab02d4844a7d6b5dc5682",
        "text": "updated Great event",
        "timestamp": "2024-01-31T21:01:39.514Z",
        "__v": 0
    }
  }

### Delete Comment
- **URL:** `/comments/:commentId`
- **Method:** `DELETE`
- **Description:** Delete a comment.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
  
- **Response:**
   ```json
  {
    "message": "Comment deleted successfully"
  }

### Get Comments for Event
- **URL:** `/comments/:eventId`
- **Method:** `GET`
- **Description:** Get all comments for a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
  
- **Response:**
   ```json
  {
     {
        "_id": "65bab533c4c3a29d2783a318",
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65bab02d4844a7d6b5dc5682",
        "text": "updated Great event",
        "timestamp": "2024-01-31T21:01:39.514Z",
        "__v": 0
    }
   ...
  }

## Ratings

 ### Rate Event
- **URL:** `/events/:eventId/rate`
- **Method:** `POST`
- **Description:** Rate an event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Request Body:**
  ```json
  {
     "rating": 5
  }
- **Response:**
   ```json
  {
     "message": "Event rated successfully",
    "rating": {
        "user": "65b9ff5f074114a0ec6362d6",
        "event": "65bab02d4844a7d6b5dc5682",
        "rating": 5,
        "_id": "65bab7d0c4c3a29d2783a31e",
        "timestamp": "2024-01-31T21:12:48.120Z",
        "__v": 0
    }
  }

### Get Average Rating for Event
- **URL:** `/events/:eventId/rating`
- **Method:** `GET`
- **Description:** Get the average rating for a specific event.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
  
- **Response:**
   ```json
  {
     "averageRating": 5
  }

## Search Events

 ### Search Events by Title, Date, or Location
- **URL:** `/search`
- **Method:** `GET`
- **Description:** Search for events based on title, date, or location.
- **Authorization Header:**
  ```json
  {
    Bearer <token>
  }
- **Query Parameters:**
  * title (optional): Search events by title.
  * date (optional): Search events by date (ISO 8601 date format).
  * location (optional): Search events by location.

- **Response:**
   ```json
  {
      "message": "Event search results",
    "events": [
        {
            "_id": "65ba520e0b4071a524b1eca9",
            "title": "carnival",
            "description": "neweve",
            "date": "2024-01-31T13:58:38.255Z",
            "time": "7:27:12 PM",
            "location": "goa",
            "organizer": "65b9ff5f074114a0ec6362d6",
            "isActive": true,
            "__v": 0
        }
    ]
  }


## Swagger UI
Swagger UI is available at http://localhost:3000/api-docs for detailed API documentation.


![Screenshot from 2024-02-01 03-04-38](https://github.com/dibyansh01/Event-Management-System/assets/129924389/32099f2b-e079-4de9-9356-6aa74d55ae23)
![Screenshot from 2024-02-01 03-04-55](https://github.com/dibyansh01/Event-Management-System/assets/129924389/5514e1ff-4d68-4ef9-ad86-dc240387dbbd)



