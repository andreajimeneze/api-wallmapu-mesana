import { notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { paginationRequestDTO } from "../../core/responses/paginationResponse.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { notificationDTO } from "./notification.dto.js";
import { countUnreadByUdserIdRepository, createNotificationRepository, findNotificationByIdRepository, getAllNotificationPaginationRepository, markAsReadAllNotificationRepository, markNotificationByUserRepository } from "./notification.repository.js";

export const getAllNotificationsPaginationService = async(params) => {
    return await getAllPaginationService(params, getAllNotificationPaginationRepository, notificationDTO);
  };
export const getNotificationByIdService = async (id) => {
    const notification = await findNotificationByIdRepository(id);
    if(!notification) throw notFoundError();
    return notification;
};
export const getNotificationsByUnreadUserIdService = async (userId) => {
    const unread = await findNotificationsByUnreadUserIdRepository(userId);
    if(!unread || unread.length === 0) throw notFoundError();
    return unread;
};

export const countUnreadNotificationsByUserService = async (userId) => {
    return await countUnreadByUdserIdRepository(userId);
}
export const createNotificationService = async (data) => {
    return await createNotificationRepository(data);
};
export const markOneNotificationAsReadService = async(userId, id) => {
    const notification = await findNotificationByIdRepository(id);
    if(!notification) throw notFoundError();
    return await markNotificationByUserRepository(userId, id);
};

export const markAllNotificationAsReadService = async(userId) => {
    // const count = await countUnreadByUdserIdRepository(userId);
    // if(count === 0) throw notFoundError();
    return await markAsReadAllNotificationRepository(userId);
};