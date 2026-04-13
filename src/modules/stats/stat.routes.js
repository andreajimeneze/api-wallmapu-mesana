import express from 'express';
import { getAllStatAdmin } from './stat.controller.js';

const router = express.Router();

router.get('/admin-stats', getAllStatAdmin);

export default router;