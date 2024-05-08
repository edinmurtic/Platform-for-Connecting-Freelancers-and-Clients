import express from 'express';
import { deleteUser, getUser, getAllUser,toggleUserActiveStatus, updateUser, getTotalUserCount } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();
router.get('/totalCount', verifyToken, getTotalUserCount);
router.get('/:id', getUser); 
router.get('/', verifyToken, getAllUser);
router.put('/:id/toggle-active', verifyToken, toggleUserActiveStatus);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);



export default router;
