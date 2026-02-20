import express from 'express';
import { getAllRegions, getRegionById } from './region.controller.js';

const router = express.Router();

router.get('/', getAllRegions);
router.get('/:id', getRegionById);

export default router;