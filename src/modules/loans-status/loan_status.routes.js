import express from 'express';
import { getAllLoanStatus } from './loan_status.controller.js';

const router = express.Router();

router.get('/', getAllLoanStatus);

export default router;