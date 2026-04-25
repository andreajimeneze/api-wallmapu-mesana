import express from 'express';
import { createReservation, getActiveReservationByCopy, getAllReservations, getReservationById, getReservationsAndSearch, getReservationsAndSearchForUser, getReservationsByUserId, markAsCancelReserve, markAsExpireOverdue, markAsPickUp } from './reservation.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllReservations);

router.get('/pagination', getReservationsAndSearch);

router.get('/pagination/user',  jwtMiddleware, authorizedRoles('Lector'), getReservationsAndSearchForUser);

router.put('/expire-overdue', markAsExpireOverdue);

router.get('/user/:userId', getReservationsByUserId);

router.get('/copy/:copyId', getActiveReservationByCopy);

router.get('/:id', getReservationById);

router.post('/', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), 
    createReservation);

router.put('/:id/cancel', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), markAsCancelReserve);

router.put('/:id/pickup', jwtMiddleware, 
    authorizedRoles('Admin'), markAsPickUp);


export default router;