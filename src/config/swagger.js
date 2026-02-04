import swaggerUi from 'swagger-ui-express';
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
      { url: 'https://api-negociacion.vercel.app', description: 'Producción' },
      { url: 'http://localhost:3000', description: 'Local' },
    ],
  },
 
  apis: [ path.join(__dirname, '../modules/**/*.routes.js') ], 
};

export const swaggerSpec = swaggerJsdoc(options);

// URLs de CDN para que la UI no se rompa en Vercel
const CSS_URL = "https://cdnjs.cloudflare.com";
const CUSTOM_JS = [
  "https://cdnjs.cloudflare.com",
  "https://cdnjs.cloudflare.com"
];

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: CUSTOM_JS
  }));
};