import express from 'express';
import { getAllStatAdmin } from './stat.controller.js';

const router = express.Router();

router.get('/admin', getAllStatAdmin);

export default router;