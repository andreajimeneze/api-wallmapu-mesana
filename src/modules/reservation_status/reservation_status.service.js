import { ReservationStatusModel } from "../../config/dbSequelize.js";

export const getAllStatusService = async () => {
    return await ReservationStatusModel.findAll();
}