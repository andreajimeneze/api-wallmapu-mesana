import express from 'express';
import { createUser, getUserById, getUsersPaginationSearch, updateUser } from '../users/user.controller.js';

const router = express.Router();

router.get('/', getUsersPaginationSearch);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.post('/', createUser);

export default router;