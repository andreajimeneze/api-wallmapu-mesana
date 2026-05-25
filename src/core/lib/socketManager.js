import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

let io = null;

const activeConnections = new Map();

export const initializeSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {

    try {

      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token;

      if (!token) {
        return next(new Error("Token requerido"));
      }

      const payload = jwt.verify(
        token,
        env.jwt.jwt_secret
      );

      const userId = payload.sub;

      if (!userId) {
        return next(new Error("Token inválido"));
      }

      socket.userId = userId;

      next();

    } catch (error) {

      return next(new Error("Token inválido"));
    }
  });

  io.on("connection", (socket) => {

    const userId = socket.userId;

    socket.join(userId);

    activeConnections.set(userId, socket.id);

    console.log(`Socket conectado user ${userId}`);

    socket.on("disconnect", () => {

      activeConnections.delete(userId);

      console.log(`Socket desconectado user ${userId}`);
    });
  });
};

export const sendToUser = (
  userId,
  event,
  data
) => {

  if (!io) return;

  io.to(userId).emit(event, data);
};

export const getIO = () => io;