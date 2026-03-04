import { Router } from 'express';
import news_routes from './src/modules/news/news.routes.js';
import  news_gallery_routes from './src/modules/news-gallery/news-gallery.routes.js';
import communes_routes from './src/modules/commune/commune.routes.js';
import provinces_routes from './src/modules/province/province.routes.js';
import regions_routes from './src/modules/region/region.routes.js';
import user_role_routes from './src/modules/user-role/user-role.routes.js';
import user_status_routes from './src/modules/user-status/user-status.routes.js';
import user_routes from './src/modules/users/user.routes.js';
import auth_routes from './src/modules/auth/auth.routes.js';
import editorial_routes from './src/modules/editorials/editorial.routes.js';
import authors_routes from './src/modules/authors/author.routes.js';
import subjects_routes from './src/modules/subjects/subject.routes.js';
import stat_routes from './src/modules/stats/stat.routes.js';

const router = Router();

router.use('/api/news', news_routes);
router.use('/api/news-gallery', news_gallery_routes);
router.use('/api/division-commune', communes_routes);
router.use('/api/division-province', provinces_routes);
router.use('/api/division-region', regions_routes);
router.use('/api/user-role', user_role_routes);
router.use('/api/user-status', user_status_routes);
router.use('/api/users', user_routes);
router.use('/api/auth', auth_routes);
router.use('/api/editorial', editorial_routes);
router.use('/api/author', authors_routes);
router.use('/api/subject', subjects_routes);
router.use('/api/stat', stat_routes);

export default router;
