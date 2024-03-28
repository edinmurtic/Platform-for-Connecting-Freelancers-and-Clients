import express from 'express';
import { verifyToken } from "../middleware/jwt.js";

import {
  createService,
  deleteService,
  getService,
  getServices,
} from '../controllers/service.controller.js'

const router = express.Router();
router.post('/add', verifyToken, createService);
router.delete('/:id', verifyToken, deleteService);
router.get('/single/:id', getService);
router.get('/', getServices);

export default router;
