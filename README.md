# Movie API

This is a simple REST API for a movie database, built with Node.js, Express, MongoDB and TypeScript.

## Features

-   List all movies
-   Search movies by title
-   Get a single movie by ID
-   Add a new movie
-   Update an existing movie
-   Delete a movie

## Usage

### Installation

Clone the repo

```bash
git clone https://github.com/<username>/movie-api.git
cd movie-api
```

Install dependencies

```bash
npm install
```

## Environment Setup

Create a `.env` file and add the following:

```
MONGO_URI=<your_mongo_db_uri>
PORT=3000
```

## Usage

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
npm start
```

This will start the server on port 3000.

## API Routes

-   GET `/movies` - Get all movies
-   GET `/movies/search?title=<query>` - Search movies by title
-   GET `/movies/:id` - Get single movie by ID
-   POST `/movies` - Add a new movie (Requires JSON body with movie details)
-   PUT `/movies/:id` - Update existing movie by ID (Requires JSON body with updated data)
-   DELETE `/movies/:id` - Delete movie by ID

## Testing

```
npm run test
```

## Technologies

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   TypeScript
-   Jest

## License

MIT
