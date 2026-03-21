import express from 'express';
import { getUserRoleById, getUserRoles } from './user-role.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', jwtMiddleware, checkRole(['Admin']), getUserRoles);

router.get('/:id', getUserRoleById);

export default router;