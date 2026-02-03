import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger.js";

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos públicos
app.use("/public", express.static(path.join(process.cwd(), "public")));

// 🔥 SWAGGER SIEMPRE ANTES DE LAS RUTAS
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas API
app.use(routes);

// Ruta raíz
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a la API de la Biblioteca Wallmapu Mesana",
    docs: "https://api-wallmapu-mesana.vercel.app/docs",
  });
});

// 404 AL FINAL DE TODO
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
