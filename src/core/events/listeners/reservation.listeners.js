import { eventEmitter } from "../eventEmitter.js";
import { sendToUser } from "../../lib/socketManager.js";
import { sendReservationCancelledEmail, sendReservationCreatedEmail } from "../../services/email.templates.js";
import { findUserByIdRepository } from "../../../modules/users/user.repository.js";
import { findCopyByIdRepository } from "../../../modules/copies/copy.repository.js";
import { findReservationByIdRepository } from "../../../modules/reservation/reservation.repository.js";

eventEmitter.on('RESERVATION_CREATED', async (reservation) => {
  sendToUser(reservation.userId, 'notification', {
    type: 'reservation_created',
    data: reservation
  });

  const user = await findUserByIdRepository(reservation.userId);
  const fullReservation = await findReservationByIdRepository(reservation.idReservation);

  await sendReservationCreatedEmail({
    email: user.email,
    id: fullReservation.idReservation,
    book_title: fullReservation.copy.edition.book.title,
    book_barcode: fullReservation.copy.barcode,
    expiration_date: fullReservation.expirationDate

  });
});

eventEmitter.on('CANCELED_RESERVATION', async (reservation) => {
  sendToUser(reservation.userId, 'notification', {
    type: 'canceled_reservation',
    data: reservation
  });

  const currentReservation = reservation[0].dataValues;
  const user = await findUserByIdRepository(currentReservation.userId);
  const fullReservation = await findReservationByIdRepository(currentReservation.idReservation);

  await sendReservationCancelledEmail({
    email: user.email,
    id: fullReservation.idReservation,
    book_title: fullReservation.copy.edition.book.title,
    book_barcode: fullReservation.copy.barcode
  });
})