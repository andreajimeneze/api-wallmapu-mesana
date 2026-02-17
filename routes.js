import { Router } from 'express';
import news_routes from './src/modules/news/news.routes.js';
import  news_gallery_routes from './src/modules/news-gallery/news-gallery.routes.js';

const router = Router();

router.use('/api/news', news_routes);
router.use('/api/news-gallery', news_gallery_routes);

export default router;
