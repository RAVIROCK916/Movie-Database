// create movie schema

import mongoose from "mongoose";

export const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	year: Number,
	genre: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	streamingLink: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Movie", movieSchema);
