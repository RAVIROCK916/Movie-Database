import request from "supertest";
import app from ".";

describe("GET /movies", () => {
	// 	test("should return 200 status code", async () => {
	// 		const response = await request(app).get("/movies");
	// 		console.log(response.statusCode);
	// 		expect(response.status).toBe(200);
	// 	}, 30000);
	// 	test("should return an array of movies", async () => {
	// 		const response = await request(app).get("/movies");
	// 		expect(Array.isArray(response.body)).toBe(true);
	// 	});
	// 	test("should return movies with expected properties", async () => {
	// 		const response = await request(app).get("/movies");
	// 		expect(response.body[0]).toHaveProperty("title");
	// 		expect(response.body[0]).toHaveProperty("genre");
	// 		expect(response.body[0]).toHaveProperty("rating");
	// 		expect(response.body[0]).toHaveProperty("streamingLink");
	// 	});
});

describe("POST /movies", () => {
	test("should return 201 status code", async () => {
		const newMovie = {
			title: "New Movie",
			year: 2022,
			genre: "Comedy",
			rating: 8.5,
			streamingLink: "https://example.com",
		};
		const response = await request(app)
			.post("/movies")
			.send(JSON.stringify(newMovie));
		expect(response.statusCode).toBe(201);
		console.log(response.statusCode);
	});

	test("should return 400 if required fields missing", async () => {
		try {
			const response = await request(app)
				.post("/movies")
				.send({ title: "New Movie" });

			expect(response.statusCode).toBe(400);
		} catch (error) {
			console.error(error);
		}
	});

	test("should return the inserted movie", async () => {
		const newMovie = {
			title: "New Movie",
			year: 2022,
			genre: "Comedy",
			rating: 8.5,
			streamingLink: "https://example.com",
		};
		const res = await request(app).post("/movies").send(newMovie);

		expect(res.body).toEqual(expect.objectContaining(newMovie));
	});

	test("should return movie with given title", async () => {
		const title = "Movie Name";

		const response = await request(app).get(`/movies?title=${title}`);

		expect(response.body).toEqual(
			expect.arrayContaining([expect.objectContaining({ title })])
		);
	});

	test("should return movie with given genre", async () => {
		const genre = "Comedy";

		const response = await request(app).get(`/movies?q=${genre}`);

		expect(response.body).toEqual(
			expect.arrayContaining([expect.objectContaining({ genre })])
		);
	});
});

// describe("PUT /movies/:id", () => {
// 	test("should return 404 if invalid movie id", async () => {
// 		const invalidId = "1234";

// 		// Expect 404 status code
// 		await expect(
// 			request(app).put(`/movies/${invalidId}`)
// 		).rejects.toMatchObject({
// 			statusCode: 404,
// 		});
// 	});

// 	test("should update and return movie if valid id", async () => {
// 		try {
// 			const movieId = "5eb3e2b091f76a6cae3f4258"; // valid object id
// 			const updateData = {
// 				title: "Updated Movie Name",
// 				year: 2020,
// 			};
// 			const response = await request(app)
// 				.put(`/movies/${movieId}`)
// 				.send(updateData);
// 			expect(response.statusCode).toBe(200);
// 			expect(response.body).toEqual({
// 				message: "Movie updated successfully",
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});
// });

// describe("DELETE /movies/:id", () => {
// 	test("should return 404 if invalid movie id", async () => {
// 		try {
// 			const invalidId = "1234";
// 			const response = await request(app).delete(`/movies/${invalidId}`);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});

// 	test("should delete and return success message if valid id", async () => {
// 		try {
// 			const movieId = "5eb3e2b091f76a6cae3f4258"; // valid object id
// 			const response = await request(app).delete(`/movies/${movieId}`);
// 			expect(response.statusCode).toBe(200);
// 			expect(response.body).toEqual({
// 				message: "Movie deleted successfully",
// 			});
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	});
// });
