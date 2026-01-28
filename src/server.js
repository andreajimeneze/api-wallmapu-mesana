import app from "./app.js";
import { env } from './config/env.js';
import { sequelize } from "./config/dbSequelize.js";

const PORT = env.port;

async function startServer() {
    try {
      await sequelize.authenticate();
      console.log("Conexión a la Db exitosa");

      app.listen(PORT, () => {
        console.log(`Servidor levantado en puerto ${PORT}`);
      });
    } catch (error) {
      console.error("Error en la conexión a la DB", error.message);
    }
  }

startServer();


