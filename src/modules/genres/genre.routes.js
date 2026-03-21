import express from 'express';
import { getAllGenres, getGenreById } from './genre.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllGenres);

router.get('/:id', getGenreById);

export default router;