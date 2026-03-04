import express from 'express';
import { createAuthor, getAllAuthors } from './author.controller.js';
import { checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllAuthors);

router.post('/', jwtMiddleware, checkRole(['Admin']),createAuthor);

export default router;