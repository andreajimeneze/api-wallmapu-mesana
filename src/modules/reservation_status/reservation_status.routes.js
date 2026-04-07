import express from 'express';
import { getAllStatus } from './reservation_status.controller.js';

const router = express.Router();

router.get('/', getAllStatus);

export default router;