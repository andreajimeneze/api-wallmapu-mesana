import express from 'express';
import { getAllCopies, getCopyById } from './copy.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCopies);

router.get('/:id', jwtMiddleware, checkRole(['Admin', 'Lector']), getCopyById);

export default router;