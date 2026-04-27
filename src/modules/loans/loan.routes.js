import express from 'express';
import { createLoan, getActiveLoanByBarcode, getActiveLoansByBookId, getActiveLoansByCopyId, getActiveLoansByUserId, getAllLoans, getLoanById, getLoansOverDue, getLoansPaginationAndSearch, getLoansPaginationAndSearchForUser, markLoanAsExpireOverdue, returnLoan } from './loan.controller.js';
import { jwtMiddleware, authorizedRoles } from '../auth/auth.middleware.js';
const router = express.Router();

router.get('/', getAllLoans);

router.get('/pagination', jwtMiddleware, 
    authorizedRoles('Admin'), getLoansPaginationAndSearch);

router.get('/pagination/user', jwtMiddleware, authorizedRoles('Lector'), getLoansPaginationAndSearchForUser)

router.get('/overdue',  getLoansOverDue);

router.get('/copy/:barcode', getActiveLoanByBarcode);

router.get('/:id', getLoanById);

router.get('/user/:userId', getActiveLoansByUserId);

router.get('/copy/:copyId', getActiveLoansByCopyId);

router.get('/book/:bookId', getActiveLoansByBookId);


router.post('/', jwtMiddleware, 
    authorizedRoles('Admin'), createLoan);

router.put('/copy/:copyId/return',
    jwtMiddleware, 
    authorizedRoles('Admin'), 
    returnLoan);

router.put('/expire-overdue', jwtMiddleware, 
    authorizedRoles('Admin'), markLoanAsExpireOverdue);

export default router;