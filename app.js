import express from 'express';
import cors from 'cors';
import path from 'path';
import news_routes from './src/modules/news/news.routes.js';
import  news_gallery_routes from './src/modules/news-gallery/news-gallery.routes.js';


const app = express();

app.use(cors({
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders : ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use('/api/news', news_routes);
app.use('/api/gallery', news_gallery_routes)

export default app;
