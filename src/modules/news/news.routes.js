import express from 'express';
import {
  getNewsPaginationAndSearch,
  getNewsById,
  updateNews,
  deleteNews,
  createNewsWithImages
} from './news.controller.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:id_news', getNewsById);

router.post('/', createNewsWithImages);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);


export default router;
