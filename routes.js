import { Router } from 'express';
import news_routes from './src/modules/news/news.routes.js';
import  news_gallery_routes from './src/modules/news-gallery/news-gallery.routes.js';
import communes_routes from './src/modules/commune/commune.routes.js';
import provinces_routes from './src/modules/province/province.routes.js';
import regions_routes from './src/modules/region/region.routes.js';
import user_role_routes from './src/modules/user-role/user-role.routes.js';
import user_status_routes from './src/modules/user-status/user-status.routes.js';

const router = Router();

router.use('/api/news', news_routes);
router.use('/api/news-gallery', news_gallery_routes);
router.use('/api/communes', communes_routes);
router.use('/api/provinces', provinces_routes);
router.use('/api/regions', regions_routes);
router.use('/api/role', user_role_routes);
router.use('/api/status', user_status_routes);

export default router;
