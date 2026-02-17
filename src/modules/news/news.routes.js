import express from 'express';
import {
  getNewsPaginationAndSearch,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  createNewsWithImages
} from './news.controller.js';

import { upload } from '../../services/images/multer.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:id_news', getNewsById);

router.post('/', createNews);

router.post('/images', upload.array('image', 3), createNewsWithImages);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);


export default router;
