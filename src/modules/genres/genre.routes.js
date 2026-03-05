import express from 'express';
import { getAllGenres, getGenreById } from './genre.controller.js';

const router = express.Router();

router.get('/', getAllGenres);

router.get('/:id', getGenreById);

export default router;