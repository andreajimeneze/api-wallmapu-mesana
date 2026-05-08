import { ReservationModel } from "../../config/dbSequelize.js";

export const findAllReservationStatusRepository = async () => {
    return await ReservationModel.findAll();
};