import { internalServerResponse, notFoundResponse, succesGetResponse, successDeleteResponse } from "../../core/responses/apiResponse.js"
import { createNotificationDTO, notificationDTO } from "./notification.dto.js";
import { createNotificationService, deleteNotificationByIdService, deleteNotificationByUserIdService, getAllNotificationsPaginationService, getAllNotificationsService, getNotificationByIdService, getNotificationsByUnreadUserIdService } from "./notification.service.js";

export const getAllNotificationsPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }

    const result = await getAllNotificationsPaginationService({
      page,
      limit,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Notificaciones obtenidas exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las notificaciones' }));
  }
};
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await getAllNotificationsService();

        if (!notifications || notifications.length === 0) {
            return res.status(200).json(succesGetResponse({ message: 'No existen notificaciones' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Notificaciones obtenidas exitosamente', data: notifications.map(notificationDTO) }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las notificaciones' }));
    };
};

export const getNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await getNotificationByIdService(id);

        if (!notification) {
            return res.status(404).json(notFoundResponse({ message: 'No existe la notificación buscada' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', data: notificationDTO(notification) }));
    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la notificación' }));
    };
};

export const getNotificationsUnreadByUserId = async (req, res) => {
    const { userId } = req.params;

    try {

        const unreadNotifications = await getNotificationsByUnreadUserIdService(userId);

        if (!unreadNotifications) {
            return res.status(404).json(notFoundResponse({ message: 'No existen notificaciones no leídas' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', data: unreadNotifications.map(notificationDTO) }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la notificación' }));
    };
};

export const createNotification = async (req, res) => {
    const dtoNotification = createNotificationDTO(req.body);

    try {

        const newNotification = await createNotificationService(dtoNotification);

        return res.status(201).json({ message: 'Notificación creada con éxito', data: notificationDTO(newNotification) });

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar crear la notificación' }));
    };
};

export const deleteNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await deleteNotificationByIdService(id);

        return res.status(202).json(successDeleteResponse({ message: 'Notificación eliminada exitosamente', data: notification }));

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar eliminar la notificación' }));
    };
};

export const deleteNotificationByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const notification = await deleteNotificationByUserIdService(userId);

        return res.status(202).json(successDeleteResponse({ message: 'Notificación eliminada exitosamente', data: notification }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar eliminar la notificación' }));
    };
};