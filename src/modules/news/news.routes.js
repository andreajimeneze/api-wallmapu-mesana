import express from 'express';
import { upload } from '../../config/multer.js';
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

router.post('/', upload.array('images', 3),createNews);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);

export default router;
