import express from 'express';
import { getUserRoles } from './user-role.controller.js';

const router = express.Router();

router.get('/', getUserRoles);

export default router;