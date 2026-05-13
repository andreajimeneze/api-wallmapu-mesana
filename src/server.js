import app from "./app.js";
import { Server } from 'socket.io';
import  http  from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("cliente conectado", socket.id);

  socket.broadcast.emit('like ig', message)

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  })
});


server.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});
