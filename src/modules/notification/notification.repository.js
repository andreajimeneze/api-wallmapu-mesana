import { Op } from "sequelize";
import { NotificationModel, UserModel } from "../../config/dbSequelize.js";
import { notificationDTO } from "./notification.dto.js";

export const getAllNotificationPaginationRepository = async ({ page, limit, search, filter }) => {
    const { isRead, userId } = filter || {};

    const include = [
        {
            model: UserModel,
            as: 'user',
            attributes: ['email']
        }
    ]

    const where = {};

      if (userId !== undefined) {
        where.userId = userId;
    }

    if (isRead !== undefined) {
        where.isRead = isRead;
    }

    const offset = (page - 1) * limit;

    const items = await NotificationModel.count({ where });
    const result = await NotificationModel.findAll({
        where,
        include,
        limit,
        offset,
        raw: true,
    });

    return { count: items, rows: result };
};
export const findNotificationByIdRepository = async (id) => {
    return await NotificationModel.findByPk(id);
};
export const findNotificationsByUnreadUserIdRepository = async (userId) => {
    return await NotificationModel.findAll({
        where: {
            userId: userId,
            isRead: false
        },
        order: [['created_at', 'DESC']]
    });
};
export const createNotificationRepository = async (data) => {
    return await NotificationModel.create(data);
};
export const markNotificationByUserRepository = async (userId, id) => {
    const [affectedRows] = await NotificationModel.update(
        { isRead: true },
        {
            where: {
                userId: userId,
                idNotification: id,
                isRead: false
            }
        }
    )
    return affectedRows;
};
export const markAsReadAllNotificationRepository = async (userId) => {
    const [affectedRows] = await NotificationModel.update(
        { isRead: true },
        {

            where: {
                userId: userId,
                isRead: false
            }
        })
    return affectedRows;
};
export const countUnreadByUserIdRepository = async (userId) => {
    return await NotificationModel.count({
        where: {
            userId,
            isRead: false
        }
    })
}