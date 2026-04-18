import express from 'express';
import { createEdition, deleteWithImageEdition, getAllEditions, getEditionByBookId, getEditionById, getEditionByIdDetail, getEditionPagination, updateEdition } from './edition.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';
const router = express.Router();

router.get('/', getAllEditions);

router.get('/pagination', getEditionPagination);

router.get('/:id/detail', getEditionByIdDetail);

router.get('/:id', getEditionById);

router.get('/book/:idBook/edition/:idEdition', getEditionByBookId);
 
router.post('/', jwtMiddleware, checkRole(['Admin']), createEdition);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateEdition);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteWithImageEdition);

export default router;