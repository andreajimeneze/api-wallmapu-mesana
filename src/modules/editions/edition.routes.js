import express from 'express';
import { createEdition, getAllEditions, getEditionByBookId, getEditionById, getEditionPagination, updateEdition } from './edition.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';
const router = express.Router();

router.get('/', getAllEditions);

router.get('/pagination', getEditionPagination);

router.get('/:id', getEditionByBookId);

//router.get('/book/:idBook/edition/:idEdition', getEditionByBookId);

router.post('/', jwtMiddleware, checkRole(['Admin']), createEdition);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateEdition);

export default router;