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


export const reservationResponseDTO = (res) => {
    const copy = res.copy;
    const edition = copy?.edition;

    return {
        id_reservation: res.idReservation,
        reservation_date: res.reservationDate,
        expiration_date: res.expirationDate,

        user_id: res.userId,
        user_name: res.user?.username,
        user_lastname: res.user?.userlastname,
        user_email: res.user?.email,

        copy_id: res.copyId,
        copy_barcode: copy?.barcode,
        copy_signature: copy?.signatureTopography,

        book_id: edition?.book?.idBook,
        book_title: edition?.book?.title,

        reservation_status_id: res.reservationStatusId,
        reservation_status_name: res.reservationStatus?.name
    };
};
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