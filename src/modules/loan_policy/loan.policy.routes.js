import express from 'express';
import { createLoanPolicy, deletePolicy, getAllLoanPolicies, getPolicyById, updateLoanPolicy } from './loan_policy.controller.js';

const router = express.Router();

router.get('/', getAllLoanPolicies);

router.get('/:id', getPolicyById);

router.post('/', createLoanPolicy);

router.put('/:id', updateLoanPolicy);

router.delete('/:id', deletePolicy);

export default router;