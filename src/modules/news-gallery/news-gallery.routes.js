import express from 'express';
import { getGalleryByNews } from './news-gallery.controller.js';

const router = express.Router();

router.get('/news/:news_id/gallery', getGalleryByNews);

export default router;