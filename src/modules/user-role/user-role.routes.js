import express from 'express';
import { getUserRoles } from './user-role.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getUserRoles);

export default router;