import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI - Configuración compatible con Vercel
const CSS_URL = "https://cdnjs.cloudflare.com";

// ELIMINA el condicional if (process.env.VERCEL !== '1') para que funcione en la nube
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { 
  customCssUrl: CSS_URL,
  customSiteTitle: "Wallmapu Mesana API Docs"
}));

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a la API de la Biblioteca Wallmapu Mesana",
    docs: "/docs", // Ruta relativa es más segura
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;

