import express from 'express';
import { getActiveReservationByCopy, getAllReservations, getReservationById, getReservationsByUserId } from './reservation.controller.js';

const router = express.Router();

router.get('/', getAllReservations);

router.get('/:id', getReservationById);

router.get('/user/:userId', getReservationsByUserId);

router.get('/copy/:copyId', getActiveReservationByCopy);

export default router;