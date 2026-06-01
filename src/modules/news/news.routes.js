import express from 'express';
import { upload } from "../../core/lib/multer.js";
import {
  getNewsPaginationAndSearch,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  createNewsWithImages,
  updateNewsWithImage
} from './news.controller.js';
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:idNews', getNewsById);

router.post('/', jwtMiddleware, checkRole('Admin'), createNews);

router.post(
  '/images',
  upload.array('files', 3), jwtMiddleware, checkRole('Admin'),
  createNewsWithImages
);

router.put('/:id',  upload.array('files', 3), jwtMiddleware, checkRole('Admin'), updateNewsWithImage);

router.delete('/:id', jwtMiddleware, checkRole('Admin'), deleteNews);


export default router;
