import express from 'express';
import { getAllProvinces } from './province.controller.js';

const router = express.Router();

router.get('/', getAllProvinces);

export default router;