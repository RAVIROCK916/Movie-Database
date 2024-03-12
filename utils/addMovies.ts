export const addMovies = async (collection: any, movies: Array<Object>) => {
	try {
		const isEmpty = (await collection.estimatedDocumentCount()) === 0;
		if (isEmpty) {
			await collection.insertMany(movies);
			console.log("Movies added successfully");
		}
	} catch (error) {
		console.error(error);
	}
	return collection;
};
