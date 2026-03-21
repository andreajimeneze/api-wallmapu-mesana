import express from 'express';
import { getAllCopyStatus, getCopyStatusById } from './copy_status.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', jwtMiddleware, checkRole(['Admin', 'Lector']), getAllCopyStatus);

router.get('/:id', jwtMiddleware, checkRole(['Admin', 'Lector']), getCopyStatusById);

export default router;