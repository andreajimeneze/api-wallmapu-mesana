import express from 'express';
import { getUsersStatus } from './user-status.controller.js';

const router = express.Router();

router.get('/', getUsersStatus);

export default router;