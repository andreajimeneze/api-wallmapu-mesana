import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger.js';

const app = express();

app.use(cors({
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders : ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use(routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
    res.status(404).json({
        message : 'Endpoint not found'
    });
});

app.use('/', (req, res, next) => {
    res.status(200).json({
        message : 'Welcome to the News API'
    });
});

// Start the server local y base de datos
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
         console.log(`Servidor levantado en puerto ${PORT}`);
       });
export default app;
