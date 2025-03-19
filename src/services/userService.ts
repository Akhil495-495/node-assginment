import { db } from '../db/connect';
import { User } from '../models/userModel';
import { ObjectId } from 'mongodb';

const usersCollection = db.collection('users');

export async function loadUsers() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	let users = await response.json();
	// Limit to only 10 users
	users = users.slice(0, 10);

	for (const user of users) {
		const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
		let posts = await postResponse.json();

		// Limit to 10 posts per user
		posts = posts.slice(0, 10);

		for (const post of posts) {
			const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
			const comments = await commentResponse.json();

			// Limit to 10 comments per post
			post.comments = comments.slice(0, 10);
		}
		user.posts = posts;
	}

	await usersCollection.insertMany(users);
}

export async function deleteAllUsers() {
	await usersCollection.deleteMany({});
}

export async function deleteUserById(userId: string) {
	await usersCollection.deleteOne({ _id: new ObjectId(userId) });
}

export async function getUserById(userId: string) {
	return await usersCollection.findOne({ _id: new ObjectId(userId) });
}

export async function addUser(user: User) {
	await usersCollection.insertOne(user);
}

export async function getUserByEmail(email: string) {
	return await usersCollection.findOne({ email });
}
