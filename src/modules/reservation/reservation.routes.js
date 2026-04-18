import express from 'express';
import { createReservation, getActiveReservationByCopy, getAllReservations, getReservationById, getReservationsByUserId, markAsExpireOverdue } from './reservation.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllReservations);

router.put('/expire-overdue', markAsExpireOverdue);

//router.get('/user/:userId', getReservationsByUserId);
//router.get('/copy/:copyId', getActiveReservationByCopy);

//router.get('/:id', getReservationById);

router.post('/', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), 
    createReservation);


export default router;