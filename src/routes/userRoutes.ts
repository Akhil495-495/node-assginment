import express from 'express';
import { deleteUser, deleteUsers, getUser, load, putUser } from '../controllers/userController';
const router = express.Router();

router.get('/load', load);
router.delete('/users', deleteUsers);
router.delete('/users/:userId', deleteUser);
router.get('/users/:userId', getUser);
router.put('/users', putUser);

export default router;
