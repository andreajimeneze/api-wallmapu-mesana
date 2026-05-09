import express from 'express';
import { getDefaultPolicy, updateLoanPolicy } from './loan_policy.controller.js';

const router = express.Router();


router.get('/default', getDefaultPolicy);

router.put('/:id', updateLoanPolicy);


export default router;