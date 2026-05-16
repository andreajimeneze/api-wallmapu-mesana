import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { env } from "../../config/env.js";


class ConnectionManager {
  constructor() {
    // { userId: socket }
    this.activeConnections = new Map();
    this.io = null;
  }

  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      try {
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.query?.token;

        if (!token) {
          return next(new Error("Token requerido"));
        }

        const payload = jwt.verify(token, env.jwt.jwt_secret);
        const userId = payload.sub;

        if (!userId) {
          return next(new Error("Token inválido"));
        }

        socket.userId = userId;

        next();
      } catch (err) {
        return next(new Error("Token inválido"));
      }
    });

    this.io.on("connection", (socket) => {
      const userId = socket.userId;

      this.activeConnections.set(userId, socket);

      console.log(`WebSocket conectado user ${userId}`);

      // opcional: recibir mensajes del cliente
      socket.on("message", (data) => {
        console.log("mensaje recibido:", data);
      });

      socket.on("disconnect", () => {
        this.activeConnections.delete(userId);
        console.log(`WebSocket desconectado user ${userId}`);
      });
    });
  }

  async sendToUser(userId, message) {
    const socket = this.activeConnections.get(userId);

    if (!socket) return;

    socket.emit("notification", message);
  }

  getActiveConnections() {
    return this.activeConnections;
  }
}

export const manager = new ConnectionManager();