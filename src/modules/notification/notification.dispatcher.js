import { createNotificationRepository } from "./notification.repository.js";
import { sendToUser } from "../../core/lib/socketManager.js";
import { sendAdminEmail } from "../../core/services/email.templates.js";
import { findUserByEmailRepository, findUserByIdRepository } from "../users/user.repository.js";
import { notFoundError } from "../../core/helpers/errors/httpErrors.js";

export const dispatchNotification = async ({
  email,
  title,
  message,
  isPriority = false,
  sendEmail = false,
}) => {

  const user = await findUserByEmailRepository(email);
  if (!user) throw notFoundError();

  const notification = await createNotificationRepository({
    userId: user.idUser,
    title,
    message,
    isPriority,
  });

  sendToUser(user.idUser, "notification", {
    type: "new_notification",
    data: notification
  });

  if (sendEmail) {
    await sendAdminEmail({
      email: user.email,
      title,
      message,
      is_priority: isPriority
    });
  }

  return notification;
};