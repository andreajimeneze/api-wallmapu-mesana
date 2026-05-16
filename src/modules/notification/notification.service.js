import { paginationRequestDTO } from "../../core/responses/paginationResponse.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { notificationDTO } from "./notification.dto.js";
import { countUnreadByUdserIdRepository, getAllNotificationPaginationRepository } from "./notification.repository.js";

export const getAllNotificationsPaginationService = async(params) => {
    return await getAllPaginationService(params, getAllNotificationPaginationRepository, notificationDTO);

//   const { page, limit, search } = paginationRequestDTO(params);
  
//   const { page: normalizedPage, limit: normalizedLimit } = normalizePagination(page, limit);

//   const { count: items, rows: result } = await getAllNotificationPaginationRepository({page: normalizedPage, limit: normalizedLimit, search});

//   const pages = Math.ceil(items / normalizedLimit);

//   const urlResponse = paginationUrl('pagination', normalizedPage, pages, normalizedLimit, search);

//   if (items === 0) {
//       return emptyPaginationDTO({ page: normalizedPage, pages, items, urlResponse })
//     }
    
  
//     const haveSearch = search && search.trim() !== "";

//     let currentPage = normalizedPage;
  
//     if (currentPage > pages && currentPage > 0) {
//       currentPage = haveSearch ? 1 : pages;
//     } else if (currentPage < 1) {
//       currentPage = 1;
//     }
  
//     return {
//       response: "Notificaciones obtenidas exitosamente",
//       data: paginationResponseDTO({
//         page: currentPage,
//         pages,
//         items,
//         urlResponse,
//         data: result.map(notificationDTO),
//       }),
//     };
  };

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

export const getUnreadCountService = async(userId) => {
    return await countUnreadByUdserIdRepository(userId);
}