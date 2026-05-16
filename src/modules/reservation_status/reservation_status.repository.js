import { ReservationStatusModel } from "../../config/dbSequelize.js";

export const findAllReservationStatusRepository = async () => {
    return await ReservationStatusModel.findAll();
};