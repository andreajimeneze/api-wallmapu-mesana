import { getAllStatusService } from "./reservation_status.service.js";
import { internalServerResponse, notFoundResponse, succesGetResponse } from '../../shared/apiResponse.js';
import { reservationStatusDTO } from "./reservation_status.dto.js";

export const getAllStatus = async (req, res) => {
    try {
        const allStatus = await getAllStatusService();

        if (!allStatus) {
            return res.status(404).json(notFoundResponse({ message: 'No existen status cargados' }))
        }

        return res.status(200).json(succesGetResponse({ message: 'Status obtenidos con éxito', result: reservationStatusDTO(allStatus) }));

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los status' }));
    }
};