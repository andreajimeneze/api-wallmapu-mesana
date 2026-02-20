import express from 'express';
import { getAllCommune, getCommuneById } from './commune.controller.js';

const router = express.Router();

router.get('/', getAllCommune);

router.get('/:id', getCommuneById);

export default router;