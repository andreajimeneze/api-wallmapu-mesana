import express from 'express';
import { createGenre, deleteGenre, getAllGenres, getAllGenresPagination, getGenreById, updateGenre } from './genre.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/pagination', getAllGenresPagination);

router.get('/', getAllGenres);

router.get('/:id', getGenreById);

router.post('/', createGenre);

router.put('/:id', updateGenre);

router.delete('/:id', deleteGenre);

export default router;