import express from 'express';
import { deleteBookAuthor } from './book_author.controller.js';

const router = express.Router();

router.delete('/:idBook/:idAuthor', deleteBookAuthor);

export default router;