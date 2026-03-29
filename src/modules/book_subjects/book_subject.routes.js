import express from 'express';
import { deleteBookSubject } from './book_subject.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.delete('/:idBook/:idSubject', jwtMiddleware, checkRole(['Admin']), deleteBookSubject);

export default router;