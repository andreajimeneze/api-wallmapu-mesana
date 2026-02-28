import express from 'express';
import { getUserRoleById, getUserRoles } from './user-role.controller.js';

const router = express.Router();

router.get('/', getUserRoles);

router.get('/:id', getUserRoleById);

export default router;