import express from 'express';
import { createEdition, deleteWithImageEdition, getAllEditions, getEditionById, getEditionByIdDetail, getEditionPagination, updateEdition } from './edition.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';
const router = express.Router();

router.get('/', jwtMiddleware, checkRole(['Admin']), getAllEditions);

router.get('/pagination', getEditionPagination);

router.get('/:id', jwtMiddleware, checkRole(['Admin']), getEditionById);

router.get('/:id/detail', jwtMiddleware, checkRole(['Admin']), getEditionByIdDetail);
 
router.post('/', jwtMiddleware, checkRole(['Admin']), createEdition);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateEdition);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteWithImageEdition);

export default router;