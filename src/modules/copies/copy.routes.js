import express from 'express';
import { getAllCopies, getCopyById } from './copy.controller.js';

const router = express.Router();

router.get('/', getAllCopies);

router.get('/:id', getCopyById);

export default router;