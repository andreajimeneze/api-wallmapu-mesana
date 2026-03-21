import express from 'express';
import { deleteBookAuthor } from './book_author.controller.js';
import { jwtMiddleware, checkRole} from '../auth/auth.middleware.js';

const router = express.Router();

router.delete('/:idBook/:idAuthor', jwtMiddleware, checkRole(['Admin']), deleteBookAuthor);

export default router;