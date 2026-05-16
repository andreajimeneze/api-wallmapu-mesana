import { Server } from "socket.io";

const activeConnections = new Map();

export let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

   io.on("connection", (socket) => {

    console.log("AUTH:", socket.handshake.auth);

    const userId = socket.handshake.auth.userId;

    console.log("USER ID:", userId);
});

    //     socket.on("disconnect", () => {

    //         activeConnections.delete(userId);

    //         console.log(`Usuario desconectado: ${userId}`);
    //     });
    // });
};

/**
 * opcional: exportar conexiones
 */
export const getActiveConnections = () => activeConnections;