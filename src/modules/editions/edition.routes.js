import express from 'express';
import { getAllEditions, getEditionById } from './edition.controller.js';

const router = express.Router();

router.get('/', getAllEditions);

router.get('/:id', getEditionById);

export default router;