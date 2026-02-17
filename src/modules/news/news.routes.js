import express from 'express';
import {
  getNewsPaginationAndSearch,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  createNewsWithImages
} from './news.controller.js';
import { upload } from "../../services/images/multer.js";

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:id_news', getNewsById);

router.post('/', createNews);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);

router.post('/', upload.array('image', 3), createNewsWithImages);

export default router;
