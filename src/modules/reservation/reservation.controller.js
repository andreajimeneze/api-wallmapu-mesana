import { internalServerResponse, notFoundResponse, succesGetResponse } from "../../shared/apiResponse.js";
import { reservationResponseDTO } from "./reservation.dto.js";
import { getAllReservationsService } from "./reservation.service.js";

export const getAllReservations = async (req , res) => {
    try {
        const allReservations = await getAllReservationsService();

        if(!allReservations || allReservations == null) {
            return res.status(404).json(notFoundResponse({message: 'No existen reservas por el momento'}));
        };

        return res.status(200).json(succesGetResponse({message: 'Reservas obtenidas con éxito', result: allReservations.map(reservationResponseDTO)}));
    } catch(error) {
        console.error(error);
        return res.status(500).json(internalServerResponse({message: 'Error al intentar obtener las reservas'}));
    };
};