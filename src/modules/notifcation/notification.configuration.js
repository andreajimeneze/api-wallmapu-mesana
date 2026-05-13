import { Server } from "socket.io";

const io = new Server(3000);

//Websocket
// io.on('connection', (socket) => {
//     console.log(`Se conectó: ${socket.id}`);
// })