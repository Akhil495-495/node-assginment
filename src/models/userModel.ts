export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: object;
	phone: string;
	website: string;
	company: object;
	posts: Array<{ id: number; title: string; body: string; comments: object[] }>;
}
