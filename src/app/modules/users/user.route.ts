import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUsers);

router.get('/users/:userId', UserController.getSingleUser);

router.put('/users/:userId', UserController.updateUser);

router.put('/users/:userId/orders', UserController.addProductToOrder);

router.delete('/users/:userId', UserController.deleteUser);

export const UserRoutes = router;
