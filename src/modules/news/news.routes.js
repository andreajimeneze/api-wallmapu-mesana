import express from 'express';
import {
  getNewsPaginationAndSearch,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from './news.controller.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:id_news', getNewsById);

router.post('/', createNews);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);

export default router;
