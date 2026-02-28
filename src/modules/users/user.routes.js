import express from 'express';
import { getUserById, getUsersPaginationSearch, updateUser } from '../users/user.controller.js';

const router = express.Router();

router.get('/', getUsersPaginationSearch);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

export default router;