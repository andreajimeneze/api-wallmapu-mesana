import { findAllReservationStatusRepository } from "./reservation_status.repository.js";

export const getAllStatusService = async () => {
    return await findAllReservationStatusRepository();
};