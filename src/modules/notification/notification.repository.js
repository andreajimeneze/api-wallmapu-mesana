import { Op } from "sequelize";
import { NotificationModel } from "../../config/dbSequelize.js";

export const getAllNotificationPaginationRepository = async ({ page, limit, search, filter }) => {

    const { isRead, userId } = filter || {};

    const where = {};

    if (search) {
        where[Op.or] = [
            [{ title: { [Op.iLike]: `%${search}%` } }],
            [{ message: { [Op.iLike]: `%${search}%` } }],
        ]
    }

     if (userId) {
        where.userId = userId
    }

    if (isRead !== undefined) {
        where.isRead = isRead;
    }


    const offset = (page - 1) * limit;

    const items = await NotificationModel.count({ where });
    const result = await NotificationModel.findAll({
        where,
        limit,
        offset,
        raw: true,
        //order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };

};

// export const getAllNotificationsService = async () => {
//     return await NotificationModel.findAll();
// };

export const findNotificationByIdRepository = async (id) => {
    return await NotificationModel.findByPk(id);
};

// export const findNotificationByUserIdService = async (idUser) => {
//     return await NotificationModel.findOne({
//         where: { userId: idUser }
//     });
// };

// export const findNotificationsByUnreadUserIdService = async (userId) => {
//     return await NotificationModel.findAll({
//         where: {
//             userId: userId,
//             isRead: false
//         },
//         order: [['created_at', 'DESC']]
//     });
// };

export const createNotificationRepository = async (data) => {
    return await NotificationModel.create(data);
};

export const markAllAsReadNotificationByUserRepository = async (userId) => {
    const [affectedRows] = await NotificationModel.update(
        { isRead: true },
        {
            where: {
                userId: userId,
                isRead: false
            }
        }
    )
    return affectedRows;
};

export const markAsReadByNotificationRepository = async (id) => {
    const [affectedRows] = await NotificationModel.update(
        { isRead: true },
        {

            where: {
                idNotification: id,
                isRead: false
            }
        })
    return affectedRows;
};

// export const deleteNotificationByIdService = async (id) => {
//     const notification = await NotificationModel.findByPk(id);

//     if(!notification) {
//         throw new Error('No existe la notificación buscada');
//     };

//     await notification.destroy();

//     return true;
// };

export const deleteNotificationByUserIdService = async (userId) => {
    const notification = await NotificationModel.findOne(
        {
            where: {
                userId: userId
            }
        });

    if (!notification) {
        throw new Error('No existe la notificación buscada');
    };

    await notification.destroy();
    return true;
};

export const countUnreadByUdserIdRepository = async(userId) => {
    return await NotificationModel.count({
        where: {
            userId,
            isRead: false
        }
    })
}