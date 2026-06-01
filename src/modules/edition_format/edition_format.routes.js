import express from 'express';
import { createEditionFormat, deleteEditionFormat, updateEditionFormat } from './edition_format.controller.js'
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';


const router = express.Router();

router.post('/', createEditionFormat);
router.delete('/:idEdition/:idFormat', jwtMiddleware, checkRole('Admin'), deleteEditionFormat);

router.post('/:idEdition', jwtMiddleware, checkRole('Admin'), updateEditionFormat);

export default router;