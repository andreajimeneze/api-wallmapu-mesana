import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";

const app = express();

// 1. Configuración de CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Configuración de Swagger para Vercel
// Usamos CDNs para evitar que Vercel intente buscar archivos locales que no existen en producción
const CSS_URL = "https://cdnjs.cloudflare.com";
const JS_URLS = [
  "https://cdnjs.cloudflare.com",
  "https://cdnjs.cloudflare.com"
];

const swaggerOptions = {
  customCssUrl: CSS_URL,
  customJs: JS_URLS,
  customSiteTitle: "Wallmapu Mesana API Docs",
  customCss: '.swagger-ui .topbar { display: none }' // Opcional: oculta la barra superior
};

// 3. Rutas de Swagger
// Se debe usar swaggerUi.serve y swaggerUi.setup juntos en el mismo middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// 4. Archivos Estáticos
app.use("/public", express.static(path.join(process.cwd(), "public")));

// 5. Carga de Rutas de la API
app.use(routes);

// 6. Endpoint de Inicio
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a la API de la Biblioteca Wallmapu Mesana",
    docs: "/docs"
  });
});

// 7. Manejo de Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});



export default app;
