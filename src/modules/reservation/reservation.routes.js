import express from 'express';
import { getAllReservations } from './reservation.controller.js';

const router = express.Router();

router.get('/', getAllReservations);

export default router;