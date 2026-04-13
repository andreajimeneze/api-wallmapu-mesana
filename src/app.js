import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes.js";
import "dotenv/config";

const app = express();

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use(
  "/public",
  express.static(path.join(process.cwd(), "public"))
);

// Routes
app.use(routes);

// Root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a la API de la Biblioteca Wallmapu Mesana"
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
