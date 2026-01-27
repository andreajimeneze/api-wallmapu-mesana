import express from 'express';
import cors from 'cors';
import path from 'path';

import { sequelize } from './models/dbSequelize.js';

const app = express();

app.use(cors({
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders : ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/public', express.static(path.join(process.cwd(), 'public')));

let dbInitialized = false;

async function initDatabase() {
    if(!dbInitialized) {
        try {
            await sequelize.authenticate();
            console.log('Conexión a la Db exitosa')
            dbInitialized = true;
        } catch( error ) {
            console.error('Error en la conexión a la DB', error.message)
        }
    }
}

app.use(async (req, res, next ) => {
    if(!dbInitialized) {
        await initDatabase();
    }
    next();
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor levantado en puerto ${PORT}`);
});
