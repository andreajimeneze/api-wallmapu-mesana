import express from 'express';
import { getAllNews, getOneNews, createNews, updateNews, deleteNews } from './news.controller.js';

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getOneNews);
router.post('/create', createNews);
router.put('/update/:id', updateNews);
router.delete('/delete/:id', deleteNews);

export default router;