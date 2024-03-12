import mongoose from "mongoose";

export const connectDB = async (connString: string) => {
	let conn;
	try {
		conn = await mongoose.connect(connString);
		console.log(
			`MongoDB Connected:, `,
			conn.connection.host,
			conn.connection.port
		);
	} catch (error) {
		console.error(error);
	}
	return conn;
};
