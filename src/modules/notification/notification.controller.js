import { internalServerResponse, notFoundResponse, succesGetResponse, successDeleteResponse } from "../../core/responses/apiResponse.js"
import { dispatchNotification } from "./notification.dispatcher.js";
import { createNotificationDTO, notificationDTO } from "./notification.dto.js";
import { countUnreadNotificationsByUserService, createNotificationService, getAllNotificationsPaginationService, getNotificationByIdService, getNotificationsByUnreadUserIdService, markAllNotificationAsReadService, markOneNotificationAsReadService } from "./notification.service.js";

export const getAllNotificationsPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);
    let { is_read } = req.query;

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
      filter: {
        is_read
      }
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
export const getAllNotificationsUserPagination = async (req, res) => {

  try {
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);
    let { is_read } = req.query;
    const userId = req.user?.sub;


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
      filter: {
        userId,
        is_read
      }
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
export const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await getNotificationByIdService(id);

    return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', data: notificationDTO(notification) }));
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la notificación' }));
  };
};

export const getNotificationsUnreadByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const unreadNotifications = await getNotificationsByUnreadUserIdService(userId);

    return res.status(200).json(succesGetResponse({ message: 'Notificación obtenida exitosamente', data: unreadNotifications.map(notificationDTO) }));

  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la notificación' }));
  };
};

export const createNotification = async (req, res) => {
  const dtoNotification = createNotificationDTO(req.body);

  try {
    const newNotification = await dispatchNotification(dtoNotification);

    return res.status(201).json({ message: 'Notificación creada con éxito', data: notificationDTO(newNotification) });

  } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar crear la notificación' }));
  };
};
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.sub;

    const countUnread = await countUnreadNotificationsByUserService(userId);

    return res.status(200).json(succesGetResponse({ message: 'Recurso obtenido con éxito', data: countUnread }))
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las UNREAD notificaciones' }));
  };
}

export const markOneNotificationAsRead = async (req, res) => {
  const idUser = req.user.sub;
  const { id } = req.params;

  try {
    const OneasRead = await markOneNotificationAsReadService(idUser, id);

    return res.status(200).json(succesGetResponse({ message: 'Mensaje marcado como leído con éxito', data: OneasRead }))
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las UNREAD notificaciones' }));
  };
}

export const markAllNotificationsAsRead = async (req, res) => {
  const idUser = req.user.sub;

  try {
    const allASRead = await markAllNotificationAsReadService(idUser);

    return res.status(200).json(succesGetResponse({ message: 'Recurso obtenido con éxito', data: allASRead }))
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las UNREAD notificaciones' }));
  };
}
