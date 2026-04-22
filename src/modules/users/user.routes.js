import express from 'express';
import { createUser, getUserByIdUser, getUserByIdAdmin, getUsersPaginationSearch, updateUser } from '../users/user.controller.js';
import { authorizedRoles, checkRole, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/detailed/', jwtMiddleware, checkRole(['Admin']), getUsersPaginationSearch);

router.get('/detailed/:id', jwtMiddleware, checkRole(['Admin', 'Lector']), 
    getUserByIdUser);

router.get('/admin/:id', jwtMiddleware, checkRole(['Admin']), getUserByIdAdmin);

router.put('/:id', 
    //jwtMiddleware, authorizedRoles(['Lector']), 
    updateUser);

router.put('/admin/:id', 
    //jwtMiddleware, authorizedRoles(['Admin']),
     updateUser);

router.post('/', createUser);

export default router;