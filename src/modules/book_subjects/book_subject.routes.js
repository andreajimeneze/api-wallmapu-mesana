import express from 'express';
import { deleteBookSubject, updateBookSubject } from './book_subject.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.delete('/:idBook/:idSubject', jwtMiddleware, checkRole(['Admin']), deleteBookSubject);

router.put('/:idBook', jwtMiddleware, checkRole(['Admin']), updateBookSubject);

export default router;