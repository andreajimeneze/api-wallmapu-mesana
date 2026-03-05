import express from 'express';
import { getBooksPaginationAndSearch, getBookById } from './book.controller.js';

const router = express.Router();

router.get('/:id', getBookById);
router.get('/', getBooksPaginationAndSearch);



export default router;