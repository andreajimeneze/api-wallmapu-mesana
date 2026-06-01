import express from 'express';
import { createFormat, deleteFormat, getAllFormats, getAllFormatsPagination, getFormatById, updateFormat } from './format.controller.js';

const router = express.Router();

router.get('/pagination', getAllFormatsPagination);
router.get('/', getAllFormats);
router.get('/:id', getFormatById);
router.post('/', createFormat);
router.put('/:id', updateFormat);
router.delete('/:id', deleteFormat);



export default router;