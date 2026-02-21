# Notes App (Full-Stack)

A full-stack Notes application built with Node.js, Express, MongoDB, and Vanilla JavaScript.

## Features

- JWT Authentication
- Protected Routes
- User-based Authorization
- CRUD Operations
- Pagination
- Search
- Sorting
- Inline Editing
- Frontend-Backend Integration

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Vanilla JavaScript
- HTML & CSS

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Notes
- GET /api/notes
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id

Supports query params:
- page
- limit
- search
- sort

## Setup

1. Clone the repo
2. Install dependencies:
   npm install
3. Create a .env file:
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret
4. Run:
   npm run dev