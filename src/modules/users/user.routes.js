import express from 'express';
import { getUserByIdUser, getUsersPaginationSearch, updateUser, updateUserByAdmin } from '../users/user.controller.js';
import { authorizedRoles, checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/pagination', jwtMiddleware, checkRole('Admin'), getUsersPaginationSearch);

router.get('/:id', jwtMiddleware, checkRole('Admin', 'Lector'), getUserByIdUser);

router.put('/:id', jwtMiddleware, authorizedRoles('Admin', 'Lector'), updateUser);

router.put('/admin/:id', jwtMiddleware, authorizedRoles('Admin'), updateUserByAdmin);


export default router;