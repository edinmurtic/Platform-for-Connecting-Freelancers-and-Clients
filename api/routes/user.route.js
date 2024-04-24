import express from 'express';
import { deleteUser, getUser, getAllUser,toggleUserActiveStatus } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.delete('/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);
router.get('/', verifyToken, getAllUser);
router.put('/:id/toggle-active',verifyToken, toggleUserActiveStatus);



export default router;
