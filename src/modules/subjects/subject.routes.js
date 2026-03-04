import express from 'express';
import { getAllSubjects } from './subject.controller.js';

const router = express.Router();

router.get('/', getAllSubjects);

export default router;