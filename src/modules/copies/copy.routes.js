import express from 'express';
import { createCopy, deleteCopy, getCopiesByIdEdition, getAllCopiesAvailableByBook, updateCopy } from './copy.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/detail/edition/:editionId', getCopiesByIdEdition);

router.get('/detail/book/:bookId', getAllCopiesAvailableByBook);

router.post('/', jwtMiddleware, checkRole('Admin'), createCopy);

router.put('/:id', jwtMiddleware, checkRole('Admin'), updateCopy);

router.delete('/:id', jwtMiddleware, checkRole('Admin'), deleteCopy);

export default router;