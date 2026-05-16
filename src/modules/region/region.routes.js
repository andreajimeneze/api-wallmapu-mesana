import express from 'express';
import { getAllRegions } from './region.controller.js';

const router = express.Router();

router.get('/', getAllRegions);
export default router;