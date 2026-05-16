import express from 'express';
import { createCopy, deleteCopy, getAllCopies, getAllCopiesByBook, getCopiesByIdEdition, getAllCopiesAbailableByBook, getCopyById, updateCopy } from './copy.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllCopies);

router.get('/:id', getCopyById);

router.get('/book/:bookId', getAllCopiesByBook);

router.get('/detail/edition/:editionId', getCopiesByIdEdition);

router.get('/detail/book/:bookId', getAllCopiesAbailableByBook);

router.post('/', jwtMiddleware, checkRole('Admin'), createCopy);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateCopy);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteCopy);

export default router;