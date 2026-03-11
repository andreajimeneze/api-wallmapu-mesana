import express from 'express';
import { getBooksPaginationAndSearch, getBookById, createBook } from './book.controller.js';
import { checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getBooksPaginationAndSearch);

router.get('/:id', getBookById);

router.post('/', jwtMiddleware, checkRole(['Admin']), createBook);

export default router;