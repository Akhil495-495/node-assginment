import { Request, Response } from 'express';
import { loadUsers, deleteAllUsers, deleteUserById, getUserById, addUser, getUserByEmail } from '../services/userService';
import { User } from '../models/userModel';

export async function load(req: Request, res: Response) {
	await loadUsers();
	res.sendStatus(200);
}

export async function deleteUsers(req: Request, res: Response) {
	await deleteAllUsers();
	res.sendStatus(200);
}

export async function deleteUser(req: Request<{ userId: string }>, res: Response) {
	await deleteUserById(req.params.userId);
	res.sendStatus(200);
}

export async function getUser(req: Request<{ userId: string }>, res: Response) {
	const user = await getUserById(req.params.userId);

	user ? res.json(user) : res.sendStatus(404);
}

export async function putUser(req: Request, res: Response): Promise<void> {
	try {
		const user = req.body as User;

		if (!user.name || !user.email) {
			res.status(400).json({ error: 'Missing required fields' });
			return;
		}

		const existingUser = await getUserByEmail(user.email);
		if (existingUser) {
			res.status(409).json({ error: 'User with this email already exists' });
			return;
		}

		await addUser(user);
		res.sendStatus(201); // Created
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
}
