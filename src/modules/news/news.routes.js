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
import { jwtMiddleware, checkRole } from '../auth/auth.middleware.js';

const router = express.Router();


router.get('/', getNewsPaginationAndSearch);

router.get('/:idNews', getNewsById);

router.post('/', jwtMiddleware, checkRole(['Admin']), createNews);

router.post(
  '/images',
  upload.array('files', 3), jwtMiddleware, checkRole(['Admin']),
  createNewsWithImages
);

router.put('/:id', jwtMiddleware, checkRole(['Admin']), updateNews);

router.delete('/:id', jwtMiddleware, checkRole(['Admin']), deleteNews);


export default router;
