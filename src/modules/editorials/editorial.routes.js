import express from 'express';
import { createEditorial, getAllEditorials, getEditorialById } from './editorial.controller.js';

const router = express.Router();

router.get('/', getAllEditorials);

router.get('/:id', getEditorialById);

router.post('/', createEditorial);

export default router;