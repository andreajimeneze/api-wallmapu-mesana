import express from 'express';
import { createEditorial, getAllEditorials, getEditorialById, updateEditorial } from './editorial.controller.js';

const router = express.Router();

router.get('/', getAllEditorials);

router.get('/:id', getEditorialById);

router.post('/', createEditorial);

router.put('/:id', updateEditorial);

export default router;