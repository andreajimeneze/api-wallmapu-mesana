import express from 'express';
import { getBooksPaginationAndSearch, getBookById, createBook, updateBook, deleteBook, getAllBooks, getBookByIdDetail } from './book.controller.js';
import { checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/pagination', 
    //jwtMiddleware, checkRole(['Admin', 'Lector']), 
    getBooksPaginationAndSearch);

router.get('/', getAllBooks)

router.get('/:id', getBookById);

router.get('/detail/:id', getBookByIdDetail)

router.post('/', jwtMiddleware, checkRole(['Admin']), createBook);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateBook);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteBook);

export default router;