import { internalServerResponse, notFoundResponse, succesGetResponse } from "../../shared/apiResponse.js";
import { reservationResponseDTO } from "./reservation.dto.js";
import { getActiveReservationByCopyService, getAllReservationsService, getReservationByIdService, getReservationsByUserIdService } from "./reservation.service.js";

export const getAllReservations = async (req , res) => {
    try {
        const allReservations = await getAllReservationsService();

        if(allReservations.length === 0) {
            return res.status(404).json(notFoundResponse({message: 'No existen reservas por el momento'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Reservas obtenidas con éxito', result: allReservations.map(reservationResponseDTO)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener las reservas'}));
    };
};

export const getReservationById = async (req, res) => {
    const {id} = req.params;

    try {
        const reservation = await getReservationByIdService(id);

        if(!reservation) {
            return res.status(404).json(notFoundResponse({message: 'Reservación no existe'}));
        }

        return res.status(200).json(succesGetResponse({message: 'Reserva obtenida con éxito', result: reservationResponseDTO(reservation)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener la reserva'}));
    }
};

export const getReservationsByUserId = async (req, res) => {

    const { userId} = req.params;

    try {
        const reservationsByUser = await getReservationsByUserIdService(userId);

        if(reservationsByUser.length === 0) {
            return res.status(404).json(notFoundResponse({message: 'No se encontraron reservas para el usuario'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Reservas de usuario obtenidas con éxito', result: reservationsByUser.map(reservationResponseDTO)}));

    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener las reservas del usuario'}));
    }
};

export const getActiveReservationByCopy = async (req, res) => {
    const {copyId} = req.params;

    try {
        const activeReservationByCopy = await getActiveReservationByCopyService(userId, copyId);

        if(!activeReservationByCopy) {
            return res.status(200).json(notFoundResponse({message: 'No existe reserva de la copia', result: reservationResponseDTO(activeReservationByCopy)}));
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener la reserva de la copia'}));
    }
};