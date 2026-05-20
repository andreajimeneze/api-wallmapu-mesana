import express from 'express';
import { deleteBookAuthor, updateBookAuthor } from './book_author.controller.js';
import { jwtMiddleware, checkRole} from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/:idBook', jwtMiddleware, checkRole('Admin'), updateBookAuthor);

router.delete('/:idBook/:idAuthor', jwtMiddleware, checkRole('Admin'), deleteBookAuthor);

export default router;