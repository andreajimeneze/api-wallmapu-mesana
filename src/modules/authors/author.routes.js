import express from 'express';
import { createAuthor, deleteAuthor, getAllAuthors, getAllAuthorsPagination, getAuthorById, updateAuthor } from './author.controller.js';
import { checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/pagination', 
    //jwtMiddleware, checkRole(['Admin']), 
    getAllAuthorsPagination);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', jwtMiddleware, checkRole(['Admin']), createAuthor);
router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateAuthor);
router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteAuthor);

export default router;