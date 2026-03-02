import express from 'express';
import { upload } from "../../services/images/multer.js";
import {
  getNewsPaginationAndSearch,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  createNewsWithImages
} from './news.controller.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:idNews', getNewsById);

router.post('/', createNews);

router.post(
  '/images',
  upload.array('files', 3),
  createNewsWithImages
);

router.put('/:id', updateNews);

router.delete('/:id', deleteNews);


export default router;
