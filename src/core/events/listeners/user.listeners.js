import { sendToUser } from "../../lib/socketManager.js";
import { sendWelcomeEmail } from "../../services/email.templates.js";
import { eventEmitter } from "../eventEmitter.js";

eventEmitter.on('CREATED_USER', async(user) => {
    sendToUser(user.idUser, 'notification', {
        type: 'created_user',
        data: user
    })

    await sendWelcomeEmail(user);
})