import { badRequestResponse, conflictResponse, internalServerResponse, notFoundResponse, succesGetResponse, successCreateResponse, successUpdateResponse } from "../../core/responses/apiResponse.js";
import { reservationResponseDTO, ReservationWhereRequestDTO } from "./reservation.dto.js";
import { createCopyReservationService, getReservationByIdService, getReservationsWithSearchService, markAsPickUpService, updateStatusCancelReservationService, updateStatusExpireOverdueReservationsService } from "./reservation.service.js";

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
export const getReservationById = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await getReservationByIdService(id);

        return res.status(200).json(succesGetResponse({ message: 'Reserva obtenida con éxito', data: reservationResponseDTO(reservation) }));
    } catch (error) {
        console.error(error);
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener la reserva' }));
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
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        if (error.status === 409) {
            return res.status(409).json(conflictResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar crear la reserva' }));
    }
};
export const markAsExpireOverdue = async (req, res) => {
    try {
        const markedExpireOverdue = await updateStatusExpireOverdueReservationsService();

        return res.status(200).json(succesGetResponse({ message: 'Estados modificado con éxitos', data: markedExpireOverdue }))

    } catch (error) {
        console.error(error);
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        if (error.status === 409) {
            return res.status(409).json(conflictResponse({ message: error.message }));
        }
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
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        if (error.status === 409) {
            return res.status(409).json(conflictResponse({ message: error.message }));
        }
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
         if (error.status === 400) {
            return res.status(400).json(badRequestResponse({ message: error.message }));
        }
        if (error.status === 404) {
            return res.status(404).json(notFoundResponse({ message: error.message }));
        }
        if (error.status === 409) {
            return res.status(409).json(conflictResponse({ message: error.message }));
        }
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar marcar como ejemplar retirado' }))
    }
}

