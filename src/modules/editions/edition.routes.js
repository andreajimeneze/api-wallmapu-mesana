import express from 'express';
import { createEdition, deleteWithImageEdition, getEditionByBookId, getEditionByBookIdDetail, getEditionById, getEditionPagination, updateEdition } from './edition.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';
const router = express.Router();


router.get('/pagination', getEditionPagination);

router.get('/:id', jwtMiddleware, checkRole('Admin'), getEditionById);

router.get('/book/:idBook/detail', getEditionByBookIdDetail);

router.get('/book/:idBook', getEditionByBookId);
 
router.post('/', jwtMiddleware, checkRole('Admin'), createEdition);

router.put('/:id', jwtMiddleware, checkRole('Admin'), updateEdition);

router.delete('/:id', jwtMiddleware, checkRole('Admin'), deleteWithImageEdition);

export default router;