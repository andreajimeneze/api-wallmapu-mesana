import express from 'express';
import { createReservation, getActiveReservationByCopy, getAllReservations, getReservationById, getReservationsByUserId } from './reservation.controller.js';
import { authorizedRoles, jwtMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', getAllReservations);

router.get('/:id', getReservationById);

router.get('/user/:userId', getReservationsByUserId);

router.get('/copy/:copyId', getActiveReservationByCopy);

router.post('/', jwtMiddleware, 
    authorizedRoles('Lector', 'Admin'), 
    createReservation);

export default router;