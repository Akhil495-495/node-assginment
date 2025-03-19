import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Change if needed
const client = new MongoClient(uri);
export const db = client.db('node_assignment');

export async function connectDB() {
	await client.connect();
	console.log('Connected to MongoDB');
}
