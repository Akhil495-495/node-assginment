import express from 'express';
import router from './routes/userRoutes';
import { connectDB } from './db/connect';

const app = express();
app.use(express.json());
app.use('/api', router);

connectDB();
export default app;
