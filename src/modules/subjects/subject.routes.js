import express from 'express';
import { createSubject, deleteSubject, getAllSubjects, getAllSubjectsPagination, getSubjectById, updateSubject } from './subject.controller.js';

const router = express.Router();

router.get('/pagination', getAllSubjectsPagination);
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);



export default router;