import app from "./app.js";
import { Server } from 'socket.io';
import  http  from 'http';
import { initializeSocket } from './core/lib/soketManager.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

server.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});
