import express from 'express';
import { getAllCopyStatus } from './copy_status.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', jwtMiddleware, checkRole('Admin', 'Lector'), getAllCopyStatus);

export default router;