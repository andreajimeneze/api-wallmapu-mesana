import { badRequestResponse, conflictResponse, internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successUpdateResponse } from "../../core/responses/apiResponse.js";
import { reservationResponseDTO, ReservationWhereRequestDTO } from "./reservation.dto.js";
import { createCopyReservationService, getActiveReservationByCopyService, getAllReservationsService, getExpireOverdueService, getReservationByIdService, getReservationPendingById, getReservationsWithSearchService, markAsPickUpService, updateStatusCancelReservationService, updateStatusExpireOverdueReservationsService } from "./reservation.service.js";

export const getReservationsAndSearch = async (req, res) => {
    try {
        let page = parseInt(req.query.page ?? 1);
        let items = parseInt(req.query.items ?? 10);
        const id_status = parseInt(req.query.id_status);

        const { idStatus } = ReservationWhereRequestDTO({
            id_status: req.query.id_status
        });

        if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
            return res.status(400).json(
                badRequestResponse({
                    message: "El número de página o items debe ser mayor a 0",
                }),
            );
        }

        const result = await getReservationsWithSearchService({
            page,
            limit: items,
            search: req.query.search ?? "",
            filter: { idStatus }
        });

        return res.status(200).json(
            succesGetResponse({
                message: "Reservas obtenidas exitosamente",
                data: result.data,
            }),
        );
    } catch (error) {
        console.error('reservation admin controller: ', error);
        return res
            .status(500)
            .json(internalServerResponse({ message: "Error al obtener las reservas" }));
    }
};

export const getReservationsAndSearchForUser = async (req, res) => {

    let page = parseInt(req.query.page ?? 1);
    let items = parseInt(req.query.items ?? 10);
    const id_status = parseInt(req.query.id_status);
    const userId = req.user.sub;

    const { idStatus } = ReservationWhereRequestDTO({
        id_status: req.query.id_status
    });

    if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
        return res.status(400).json(
            badRequestResponse({
                message: "El número de página o items debe ser mayor a 0",
            }),
        );
    }
    try {

        const result = await getReservationsWithSearchService({
            page,
            limit: items,
            search: req.query.search ?? "",
            filter: {
                idStatus,
                userId
            }
        });

        return res.status(200).json(
            succesGetResponse({
                message: "Reservas obtenidas exitosamente",
                data: result.data,
            }),
        );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(internalServerResponse({ message: "Error al obtener las reservas" }));
    }
};

export const getAllReservations = async (req, res) => {
    try {
        const allReservations = await getAllReservationsService();

        if (allReservations.length === 0) {
            return res.status(404).json(notFoundResponse({ message: 'No existen reservas por el momento' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Reservas obtenidas con éxito', data: allReservations.map(reservationResponseDTO) }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las reservas' }));
    };
};

export const getReservationById = async (req, res) => {
    const { id } = req.params;


    try {
        const reservation = await getReservationByIdService(id);

        if (!reservation) {
            return res.status(404).json(notFoundResponse({ message: 'Reserva no encontrada' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Reserva obtenida con éxito', data: reservationResponseDTO(reservation) }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la reserva' }));
    }
};

export const getReservationsByUserId = async (req, res) => {

    const { userId } = req.params;

    try {
        const reservationsByUser = await getReservationsByUserIdService(userId);

        if (reservationsByUser.length === 0) {
            return res.status(404).json(notFoundResponse({ message: 'No se encontraron reservas para el usuario' }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Reservas de usuario obtenidas con éxito', data: reservationsByUser.map(reservationResponseDTO) }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener las reservas del usuario' }));
    }
};

export const getActiveReservationByCopy = async (req, res) => {
    const { copyId } = req.params;

    try {
        const activeReservationByCopy = await getActiveReservationByCopyService(copyId);

        if (!activeReservationByCopy) {
            return res.status(200).json(succesGetResponse({ message: 'No existe reserva de la copia', data: reservationResponseDTO(activeReservationByCopy) }));
        };

        return res.status(200).json(succesGetResponse({ message: 'Reservas activas obtenidas con éxito', data: reservationResponseDTO(activeReservationByCopy) }))
    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la reserva de la copia' }));
    }
};

export const createReservation = async (req, res) => {
    const { copy_id } = req.body;

    const user_id = req.user.sub;

    try {
        const createdReserve = await createCopyReservationService(user_id, copy_id);

        return res.status(201).json(successCreateResponse({ resource: 'Reserva' }));
    } catch (error) {
        console.error(error);
        return res
            .status(error.status || 500)
            .json({
                message: error.message || "Error al intentar crear la reserva",
            });
    }
};

// export const getExpireOverdue = async (req, res) => {
//    try {
//     const expireOverdue = await getExpireOverdueService();

//     if(!expireOverdue || expireOverdue.length === 0) {
//         return res.status(200).json(succesGetResponse({message: 'No existen reservas con fecha vencida'}))
//     };


//      return res.status(200).json(succesGetResponse({message: 'Reservas con fecha vencida obtenidas con éxito', data: expireOverdue.map(reservationResponseDTO)}))

//    } catch(error) {
//         console.error(error);
//         return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener reservas vencidas'}));
//     }
// };

export const markAsExpireOverdue = async (req, res) => {

    try {
        const markedExpireOverdue = await updateStatusExpireOverdueReservationsService();


        return res.status(200).json(succesGetResponse({ message: 'Estados modificado con éxitos', data: markedExpireOverdue }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar actualizar reservas vencidas' }));
    }

};

export const markAsCancelReserve = async (req, res) => {

    const { id } = req.params;
    const user = req.user;

    try {
        const markedCancel = await updateStatusCancelReservationService(id, user);

        if (!markedCancel) {
            return res.status(400).json(badRequestResponse({ message: 'Reserva no está pendiente o ya fue cancelada' }))
        };

        return res.status(200).json(succesGetResponse({ message: 'Estados modificado con éxitos', data: markedCancel }))

    } catch (error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar actualizar reservas vencidas' }));
    }
};

export const markAsPickUp = async (req, res) => {
    const { id } = req.params;
    const { copy_id } = req.body;

    try {
        const pickUp = await markAsPickUpService(id, copy_id);

        return res.status(202).json(successUpdateResponse({ message: 'Ejemplar marcado como retirado' }))
    } catch (error) {
        console.error(error);
        return res
            .status(error.status || 500)
            .json({
                message: error.message || 'Error al intentar marcar como ejemplar retirado'
            });
    }
}

