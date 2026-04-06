# YouTube Clone Backend

A backend API for a YouTube-like video sharing platform built with Node.js, Express.js, and MongoDB.

## Features

- User authentication and authorization (JWT-based)
- User management (registration, login)
- Channel creation and management
- Video upload and management
- Comment system for videos
- Secure password hashing with bcrypt
- CORS enabled for cross-origin requests

## Tech Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt for password hashing
- **Middleware:** CORS for cross-origin requests

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dilnakt-bnglr/youtube-clone-backend.git
   cd youtube-clone-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database and update the connection string in `dbConnection.js` if necessary.

4. Start the development server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`.

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

### Channels

- `GET /api/channels` - Get all channels
- `POST /api/channels` - Create a new channel
- `GET /api/channels/:id` - Get channel by ID
- `PUT /api/channels/:id` - Update channel
- `DELETE /api/channels/:id` - Delete channel

### Videos

- `GET /api/videos` - Get all videos
- `POST /api/videos` - Upload a new video
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

### Comments

- `GET /api/videos/:videoId/comments` - Get comments for a video
- `POST /api/videos/:videoId/comments` - Add a comment to a video
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment

## Repository

https://github.com/dilnakt-bnglr/youtube-clone-backend
