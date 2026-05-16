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
    const book = res.copy?.edition.book;

    return {
        id_reservation: res.idReservation,
        reservation_date: res.reservationDate,
        expiration_date: res.expirationDate,

        user_id: res.userId,
        user_name: res.user?.username,
        user_lastname: res.user?.userlastname,
        user_email: res.user?.email,

        copy_id: copy?.idCopy ?? null,
        copy_barcode: copy?.barcode ?? null,
        copy_signature: copy?.signatureTopography ?? null,

        book_id: book?.idBook ?? null,
        book_title: book?.title ?? null,

        reservation_status_id: res.reservationStatusId,
        reservation_status_name: res.reservationStatus?.name ?? null
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

export const updateReservationDTO = (id_reservation) => ({
   
        idReservation: id_reservation,
        //reservationStatusId: reservation_status_id
});

export const ReservationWhereRequestDTO = ({ id_status } = {}) => {
  const idStatus = Number(id_status);

  return {
    ...(idStatus > 0 && { idStatus })
  };
};