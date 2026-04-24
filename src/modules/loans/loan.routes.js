import express from 'express';
import { getActiveLoansByBookId, getActiveLoansByCopyId, getActiveLoansByUserId, getAllLoans, getLoanById, getLoansOverDue, getLoansPaginationAndSearch, markLoanAsExpireOverdue, returnLoan } from './loan.controller.js';

const router = express.Router();

router.get('/pagination', getLoansPaginationAndSearch);

router.get('/user/pagination', getLoansPaginationAndSearch);

router.get('/', getAllLoans);

router.get('/:id', getLoanById);

router.get('/user/:userId', getActiveLoansByUserId);

router.get('/copy/:copyId', getActiveLoansByCopyId);

router.get('/book/bookId', getActiveLoansByBookId);

router.get('/overdue',  getLoansOverDue);

router.put('/copy/:copyId/return', returnLoan);

router.put('/expire-overdue', markLoanAsExpireOverdue);

export default router;