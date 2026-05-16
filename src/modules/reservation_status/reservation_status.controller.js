import { getAllStatusService } from "./reservation_status.service.js";
import { internalServerResponse, succesGetResponse } from '../../core/responses/apiResponse.js';
import { reservationStatusDTO } from "./reservation_status.dto.js";

export const getAllStatus = async (req, res) => {
    try {
        const allStatus = await getAllStatusService();

        return res.status(200).json(succesGetResponse({ message: 'Status obtenidos con éxito', data: allStatus.map(reservationStatusDTO) }));

    } catch (error) {
        return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los status' }));
    }
};