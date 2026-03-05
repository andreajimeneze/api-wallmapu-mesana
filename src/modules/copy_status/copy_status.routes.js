import express from 'express';
import { getAllCopyStatus, getCopyStatusById } from './copy_status.controller.js';

const router = express.Router();

router.get('/', getAllCopyStatus);

router.get('/:id', getCopyStatusById);

export default router;