import express from 'express';
import { getAllCommune } from './commune.controller.js';

const router = express.Router();

router.get('/', getAllCommune);

export default router;