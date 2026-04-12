import { NotificationModel } from "../../config/dbSequelize.js";

export const getAllNotificationsService = async () => {
    return await NotificationModel.findAll();
};

export const getNotificationByIdService = async (id) => {
    return await NotificationModel.findByPk(id);
};

export const getNotificationByUserIdService = async (idUser) => {
    return await NotificationModel.findOne({
        where: { userId: idUser }
    });
};

export const getNotificationsByUnreadUserIdService = async (userId) => {
    return await NotificationModel.findAll({
        where: {
            userId: userId,
            isRead: false
        },
        order: [['created_at', 'DESC']]
    });
};

export const createNotificationService = async (data) => {
    return await NotificationModel.create(data);
};

export const deleteNotificationByIdService = async (id) => {
    const notification = await NotificationModel.findByPk(id);

    if(!notification) {
        throw new Error('No existe la notificación buscada');
    };

    await notification.destroy();

    return true;
};

export const deleteNotificationByUserIdService = async (userId) => {
    const notification = await NotificationModel.findOne(
        {
            where: {
            userId: userId
        }
    });

    if(!notification) {
        throw new Error('No existe la notificación buscada');
    };

    await notification.destroy();
    return true;
};