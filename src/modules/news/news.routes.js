import express from 'express';
import { getAllNews, getOneNews, createNews, editNews, deleteNews } from './news.controller.js';

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getOneNews);
router.post('/create', createNews);
router.put('/edit/:id', editNews);
router.delete('/delete/:id', deleteNews);

export default router;