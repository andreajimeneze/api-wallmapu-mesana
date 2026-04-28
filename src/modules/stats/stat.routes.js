import express from 'express';
import { getAllAdmin, getAllStatAdmin } from './stat.controller.js';

const router = express.Router();

router.get('/admin-stats', getAllStatAdmin);
router.get('/admin', getAllAdmin);

export default router;