import { baseCopyDTO } from "../copies/copy.dto.js";
import { baseEditionDTO } from "../editions/edition.dto.js";
import { reservationStatusDTO } from "../reservation_status/reservation_status.dto.js";
import { baseUserDTO } from "../users/user.dto.js";

export const baseReservationDTO = (res) => ({
    id_reservation: res.idReservation,
    reservation_date: res.reservationDate,
    expiration_date: res.expirationDate,
    user_id: res.userId,
    copy_id: res.copyId,
    reservation_status_id: res.reservationStatusId
});


export const reservationResponseDTO = (res) => ({
    reservations: baseReservationDTO(res),
    reservation_status: res.reservationStatus ? reservationStatusDTO(res.reservationStatus) : null,
    user: res.user ? baseUserDTO(res.user) : null,
    copies: res.copies && Array.isArray(res.copies) ? res.copies.map((copy) => ({
        ...baseCopyDTO(copy),
        edition: copy.edition ? baseEditionDTO(copy.edition) : null
    })) : []
});

export const createReservationDTO = ({
    expirationDate,
    userId,
    copyId,
    reservationStatusId
}) => {
    return {
        expirationDate: expirationDate,
        userId: userId,
        copyId: copyId,
        reservationStatusId: reservationStatusId
    }
};