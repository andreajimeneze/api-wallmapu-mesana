import express from 'express';
import { loginWithGoogle } from './auth.controller.js';

const router = express.Router();

router.post('/google', loginWithGoogle);

export default router;