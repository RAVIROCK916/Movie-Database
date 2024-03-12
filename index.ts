import express, { Request, Response, Application } from "express";
import { ObjectId } from "mongodb";

const app: Application = express();
const port = process.env.PORT || 8000;

import mongoose from "mongoose";
import { connectDB } from "./utils/connectDB";
import { addMovies } from "./utils/addMovies";
import { movies } from "./data/movies";
import Movie from "./schema/Movie";

const connString = "mongodb://localhost:27017/moviesdb";

let collection: mongoose.AnyObject;

// connect to MongoDB

const connectMongoDB = async () => {
	try {
		await connectDB(connString);
		const db = mongoose.connection;
		collection = await addMovies(db.collection("movies"), movies);
	} catch (err) {
		console.error(err);
	}
};

connectMongoDB();

// middleware

app.use(express.json());

// display welcome message

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Movie Database Server");
});

// display movies
app.get("/movies", async (req: Request, res: Response) => {
	try {
		const movies = await collection.find().toArray();
		res.json(movies);
	} catch (err) {
		console.error("Error finding documents:", err);
	}
});

// display movie by id
app.get("/movies/:id", async (req: Request, res: Response) => {
	const movieId = req.params.id; // Get movie ID from URL parameter
	try {
		const movie = await collection.findOne({ _id: new ObjectId(movieId) });
		res.json(movie);
	} catch (err) {
		console.error("Error finding document:", err);
	}
});

// search movie
app.get("/movies/search", async (req: Request, res: Response) => {
	try {
		const searchCriteria = {
			name: { $regex: new RegExp(req.query.q as string, "i") },
		};
		const movies = await collection.find(searchCriteria).toArray();
		res.json(movies);
	} catch (err) {
		console.error("Error finding documents:", err);
	}
});

// add movie
app.post("/movies", async (req: Request, res: Response) => {
	try {
		const { name, year, genre, rating, streamingLink } = req.body;

		const movie = {
			name,
			year,
			genre,
			rating,
			streamingLink,
		};

		// validate with movie schema

		const movieSchema = new Movie(movie);
		let isValidMovie = movieSchema.validateSync();
		if (isValidMovie) {
			return res.status(400).send("Invalid movie data");
		}

		// Insert movie into database
		let newMovie = await collection.insertOne(req.body);
		res.json(newMovie);
	} catch (err) {
		console.error("Error inserting document:", err);
	}
});

// update movie
app.put("/movies/:id", async (req: Request, res: Response) => {
	const movieId = req.params.id; // Get movie ID from URL parameter
	const updateData = req.body; // Updated movie data

	// Validate movie ID format (optional, but recommended)
	if (!ObjectId.isValid(movieId)) {
		return res.status(400).send("Invalid movie ID format");
	}

	try {
		const result = await collection.updateOne(
			{ _id: new ObjectId(movieId) },
			{ $set: updateData }
		); // Update the document

		if (result.matchedCount === 0) {
			return res.status(404).send("Movie not found"); // Handle movie not found
		}

		res.json({
			message: "Movie updated successfully",
		}); // Success response
	} catch (err) {
		console.error("Error updating movie:", err);
		res.status(500).send("Internal server error"); // Handle errors appropriately
	}
});

// delete movie
app.delete("/movies/:id", async (req: Request, res: Response) => {
	const movieId = req.params.id; // Get movie ID from URL parameter

	// Validate movie ID format (optional, but recommended)
	if (!ObjectId.isValid(movieId)) {
		return res.status(400).send("Invalid movie ID format");
	}

	try {
		const result = await collection.deleteOne({
			_id: new ObjectId(movieId),
		}); // Delete the document

		if (result.deletedCount === 0) {
			return res.status(404).send("Movie not found"); // Handle movie not found
		}

		res.json({ message: "Movie deleted successfully" }); // Success response
	} catch (err) {
		console.error("Error deleting movie:", err);
		res.status(500).send("Internal server error"); // Handle errors appropriately
	}
});

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
