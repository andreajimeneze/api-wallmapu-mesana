import express from 'express';
import { deleteBookSubject } from './book_subject.controller.js';

const router = express.Router();

router.delete('/:bookId/:subjectId', deleteBookSubject);

export default router;