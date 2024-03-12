import request from "supertest";
import app from "..";
import Movie from "../schema/Movie";

test("should return 404 if movie not found in GET", async () => {
	const response = await request(app).get("/movies/123");

	expect(response.statusCode).toBe(404);
});

test("should return 400 if name is missing", async () => {
	const response = await request(app).post("/movies").send({
		year: 2020,
	});

	expect(response.statusCode).toBe(400);
});

test("should return 400 if year is invalid", async () => {
	const response = await request(app).post("/movies").send({
		name: "New Movie",
		year: "invalid",
	});

	expect(response.statusCode).toBe(400);
});

test("should return 500 if database error", async () => {
	// mock implementation to force a database error
	jest.spyOn(Movie, "create").mockRejectedValueOnce(
		new Error("Fake database error")
	);

	const response = await request(app).post("/movies").send({
		name: "New Movie",
		year: 2020,
	});

	expect(response.statusCode).toBe(500);
});

test("should return 201 on successful movie creation", async () => {
	const response = await request(app).post("/movies").send({
		name: "New Movie",
		year: 2020,
	});

	expect(response.statusCode).toBe(201);
});

test("should return JSON body on successful movie creation", async () => {
	const response = await request(app).post("/movies").send({
		name: "New Movie",
		year: 2020,
	});

	expect(response.body).toEqual(
		expect.objectContaining({
			name: "New Movie",
			year: 2020,
		})
	);
});

test("should store the movie in the database", async () => {
	const response = await request(app).post("/movies").send({
		name: "New Movie",
		year: 2020,
	});

	const movie = await Movie.findById(response.body.id);

	expect(movie).not.toBeNull();
});

test("should return 400 if id is invalid in PUT", async () => {
	const response = await request(app).put("/movies/:id").send({
		name: "Updated Movie",
		year: 2022,
	});

	expect(response.statusCode).toBe(400);
});

test("should return 404 if movie not found in DELETE", async () => {
	const response = await request(app).delete("/movies/123");

	expect(response.statusCode).toBe(404);
});
