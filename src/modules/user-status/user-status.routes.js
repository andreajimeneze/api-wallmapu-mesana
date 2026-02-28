import express from 'express';
import { getUsersStatus, getUserStatusById } from './user-status.controller.js';

const router = express.Router();

router.get('/', getUsersStatus);

router.get('/:id', getUserStatusById);

export default router;