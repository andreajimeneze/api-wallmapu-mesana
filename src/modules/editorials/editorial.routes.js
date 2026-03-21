import express from 'express';
import { createEditorial, getAllEditorials, getEditorialById, updateEditorial } from './editorial.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllEditorials);

router.get('/:id', getEditorialById);

router.post('/', jwtMiddleware, checkRole(['Admin']),createEditorial);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateEditorial);

export default router;