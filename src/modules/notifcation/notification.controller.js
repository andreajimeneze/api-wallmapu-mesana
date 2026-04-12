import { internalServerResponse, notFoundResponse, succesGetResponse, successDeleteResponse } from "../../shared/apiResponse.js"
import { createNotificationDTO, notificationDTO } from "./notification.dto.js";
import { createNotificationService, deleteNotificationByIdService, deleteNotificationByUserIdService, getAllNotificationsService, getNotificationByIdService, getNotificationsByUnreadUserIdService } from "./notification.service.js";

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await getAllNotificationsService();

        if (!notifications) {
            return res.status(404).json(notFoundResponse({ message: 'No existen notificaciones' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Notificaciones obtenidas exitosamente', result: notifications.map(notificationDTO) }));

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

        return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', result: notificationDTO(notification) }));
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

        return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', result: unreadNotifications.map(notificationDTO) }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la notificación' }));
    };
};

export const createNotification = async (req, res) => {
    const dtoNotification = createNotificationDTO(req.body);

    try {

        const newNotification = await createNotificationService(dtoNotification);

        return res.status(201).json({ message: 'Notificación creada con éxito', result: notificationDTO(newNotification) });

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar crear la notificación' }));
    };
};

export const deleteNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await deleteNotificationByIdService(id);

        return res.status(202).json(successDeleteResponse({ message: 'Notificación eliminada exitosamente', result: notification }));

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar eliminar la notificación' }));
    };
};

export const deleteNotificationByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const notification = await deleteNotificationByUserIdService(userId);

        return res.status(202).json(successDeleteResponse({ message: 'Notificación eliminada exitosamente', result: notification }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar eliminar la notificación' }));
    };
};