import express from 'express';
import { getAllProvinces, getProvinceById } from './province.controller.js';

const router = express.Router();

router.get('/', getAllProvinces);
router.get('/:id', getProvinceById);

export default router;