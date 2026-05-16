import express from 'express';
import { getAllAdmin, getAllStatAdmin, getAllUserState } from './stat.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/admin-stats', getAllStatAdmin);
router.get('/admin', getAllAdmin);
router.get('/user-stats', jwtMiddleware, authorizedRoles('Admin', 'Lector'),  getAllUserState);

export default router;