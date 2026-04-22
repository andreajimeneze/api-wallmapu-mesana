import express from 'express';
import { getActiveLoansByBookId, getActiveLoansByCopyId, getActiveLoansByUserId, getAllLoans, getLoanById, getLoansOverDue, getLoansPaginationAndSearch } from './loan.controller.js';

const router = express.Router();

router.get('/pagination', getLoansPaginationAndSearch);

router.get('/user/pagination', getLoansPaginationAndSearch);

router.get('/', getAllLoans);

router.get('/:id', getLoanById);

router.get('/user/:userId', getActiveLoansByUserId);

router.get('/copy/:copyId', getActiveLoansByCopyId);

router.get('/book/bookId', getActiveLoansByBookId);

router.get('/overdue',  getLoansOverDue);

export default router;