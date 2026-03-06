import express from 'express';
import { getBooksPaginationAndSearch, getBookById } from './book.controller.js';

const router = express.Router();

router.get('/', getBooksPaginationAndSearch);

router.get('/:id', getBookById);

export default router;