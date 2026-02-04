import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallmapu Mesana API',
      version: '1.0.0',
      description: 'API para gestión de biblioteca',
    },
    servers: [
      {
        url: 'https://api-negociacion.vercel.app',
        description: 'Servidor producción',
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    path.join(process.cwd(), './src/modules/**/*.routes.js')
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
