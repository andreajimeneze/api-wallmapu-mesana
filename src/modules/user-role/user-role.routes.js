import express from 'express';
import { getUserRole } from './user-role.controller.js';

const router = express.Router();

router.get('/:id', getUserRole);

export default router;