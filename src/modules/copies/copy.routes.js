import express from 'express';
import { createCopy, deleteCopy, getAllCopies, getCopyById, updateCopy } from './copy.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCopies);

router.get('/:id', getCopyById);

// router.get('/:id', getCopyByIdJoin);

router.post('/', jwtMiddleware, checkRole(['Admin']), createCopy);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateCopy);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteCopy);

export default router;