import app from "./app.js";
import { Server } from 'socket.io';
import  http  from 'http';
import { initializeSocket } from './core/lib/socketManager.js';
import './core/events/listeners/loan.listeners.js';
import './core/events/listeners/reservation.listeners.js';
import './core/events/listeners/user.listeners.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});
