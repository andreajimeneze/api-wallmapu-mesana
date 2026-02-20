import express from 'express';
import { getUserStatus } from './user-status.controller.js';

const router = express.Router();

router.get('/:id', getUserStatus);

export default router;