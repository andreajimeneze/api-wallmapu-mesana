import express from 'express';
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, updateSubject } from './subject.controller.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);



export default router;