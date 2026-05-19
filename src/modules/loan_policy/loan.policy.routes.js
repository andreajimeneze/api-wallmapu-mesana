import express from 'express';
import { getDefaultPolicy } from './loan_policy.controller.js';

const router = express.Router();

router.get('/default', getDefaultPolicy);

export default router;