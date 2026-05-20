import express from 'express';
import { createReservation,  getReservationById, getReservationsAndSearch, getReservationsAndSearchForUser, markAsCancelReserve, markAsExpireOverdue, markAsPickUp } from './reservation.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();


router.get('/pagination', getReservationsAndSearch);

router.get('/pagination/user',  jwtMiddleware, authorizedRoles('Lector'), getReservationsAndSearchForUser);

router.get('/:id', getReservationById);

router.post('/', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), 
    createReservation);
    
router.put('/expire-overdue', markAsExpireOverdue);

router.put('/:id/cancel', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), markAsCancelReserve);

router.put('/:id/pickup', jwtMiddleware, 
    authorizedRoles('Admin'), markAsPickUp);


export default router;