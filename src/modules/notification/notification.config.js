import { io } from "../sockets/socketManager.js";


class ConnectionManager {

    constructor() {
        // userId -> socketId
        this.activeConnections = new Map();
    }

    /**
     * Conectar usuario
     */
    connect(socket, userId) {

        socket.join(userId);

        this.activeConnections.set(userId, socket.id);

        console.log(`Socket conectado para usuario ${userId}`);

        // iniciar observador (equivalente asyncio.create_task)
        this._observeNotifications(userId);
    }

    /**
     * Desconectar usuario
     */
    disconnect(userId) {

        if (this.activeConnections.has(userId)) {

            this.activeConnections.delete(userId);

            console.log(`Socket desconectado para usuario ${userId}`);
        }
    }

    /**
     * Enviar mensaje a un usuario
     */
    sendToUser(userId, message) {

        if (!io) return;

        io.to(userId).emit("notification", message);

        console.log(`Mensaje enviado a usuario ${userId}`);
    }

    /**
     * Observador de notificaciones (polling cada 5s)
     */
    async _observeNotifications(userId) {

        let lastCount = null;

        while (this.activeConnections.has(userId)) {

            try {

                const count = await repository.countUnreadByUserId(userId);

                if (count !== lastCount) {

                    lastCount = count;

                    this.sendToUser(userId, {
                        type: "unread_count",
                        unread_count: count
                    });
                }

            } catch (error) {

                console.error(
                    `Error observando notificaciones usuario ${userId}`,
                    error
                );
            }

            await this._sleep(5000);
        }
    }

    /**
     * sleep equivalente a asyncio.sleep
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// instancia global (igual que Python: manager = ConnectionManager())
export const manager = new ConnectionManager();