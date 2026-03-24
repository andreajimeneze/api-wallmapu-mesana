import express from 'express';
import { createCopy, getAllCopies, getCopyById, updateCopy } from './copy.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCopies);

router.get('/:id', getCopyById);

router.post('/', jwtMiddleware, checkRole(['Admin']), createCopy);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateCopy);

export default router;