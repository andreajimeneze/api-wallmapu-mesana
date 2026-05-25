import { getDefaultPolicyService, getMaxDaysLoanService } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO, reservationResponseDTO, updateReservationDTO } from "./reservation.dto.js";
import { countActiveReservationsByUserRepository, createReservationRepository, findActiveReservationByUserIdAndCopyRepository, findReservationByIdRepository, getAllReservationWithSearchRepository, markAsCompletedReservationRepository, updateExpireOverdueReservationsRepository, updateStatusCancelReservationRepository } from "./reservation.repository.js";
import { countLoansActiveByUserRepository, countLoansByUserRepository, countLoansOverDueByUserRepository, markAsPickUpRepository } from "../loans/loan.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { findCopyByIdRepository, updateStatusCopyRepository } from "../copies/copy.repository.js";
import { badRequestError, conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { sequelize } from "../../config/dbSequelize.js";
import { sendReservationCreatedEmail } from "../../core/services/email.templates.js";
import { eventEmitter } from '../../core/events/eventEmitter.js';


export const getReservationsWithSearchService = async (params) => {
    return await getAllPaginationService(params, getAllReservationWithSearchRepository, reservationResponseDTO);
};
export const getReservationByIdService = async (id) => {
    const reservation = await findReservationByIdRepository(id);
    if (!reservation) throw notFoundError();
    return reservation;
};
export const createCopyReservationService = async (userId, copyId) => {
    const [existingCopy, existingReserve, policy, overdueLoans] = await Promise.all([
        findCopyByIdRepository(copyId),
        findActiveReservationByUserIdAndCopyRepository(userId, copyId),
        getDefaultPolicyService(),
        countLoansOverDueByUserRepository(userId)
    ])

    if (!existingCopy) throw notFoundError();

    if (existingReserve) throw conflictError('Ya tienes una reserva activa de este ejemplar');

    if (overdueLoans > 0) throw conflictError('No puede realizar reserva con préstamos vencidos');

    const reservationDays = policy?.reservationDays ?? 3;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + reservationDays);
    expirationDate.setHours(23, 59, 59, 999);

    const [maxBooksReservated, maxBooksLoaned] = await Promise.all([
        countActiveReservationsByUserRepository(userId),
        countLoansActiveByUserRepository(userId)
    ])

    if (maxBooksReservated + maxBooksLoaned >= policy.maxBooks) {
        throw new Error('Usuario excede número de reservas y préstamos autorizados');
    };

    const reservation = createReservationDTO({
        userId,
        copyId,
        expirationDate,
        reservationStatusId: 1
    });

    const createdReservation = await createReservationRepository(reservation);
    eventEmitter.emit('RESERVATION_CREATED', createdReservation);

    return createdReservation;
};
export const updateStatusExpireOverdueReservationsService = async () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return await updateExpireOverdueReservationsRepository(today);
};
export const updateStatusCancelReservationService = async (id, user) => {
    const reservation = await findReservationByIdRepository(id);

    if (!reservation) throw notFoundError();

    const isOwner = reservation.userId === user.sub;
    const isAdmin = user.role === 'Admin';

    if (!isAdmin && !isOwner) throw conflictError('No tiene autorización para cancelar la reserva');

    const cancelatedReservation = await updateStatusCancelReservationRepository(id);

    eventEmitter.emit('CANCELED_RESERVATION', cancelatedReservation);

    return cancelatedReservation;
};
export const markAsPickUpService = async (id, copyId) => {
    const transaction = await sequelize.transaction();

    try {
        const reserve = await findReservationByIdRepository(id, { transaction });

        if (!reserve) throw notFoundError();

        if (reserve.reservationStatusId === 2) throw conflictError('Libro ya retirado. No puede realizar préstamo.');

        if (reserve.reservationStatusId === 3) throw conflictError('Reserva fue cancelada. No puede realizar préstamo.');

        if (reserve.reservationStatusId === 4) throw conflictError('Reserva vencida. Tiene que volver a reservar el libro.');

        if (reserve.expirationDate < new Date()) throw conflictError('No puede entregarse una reserva vencida. Debe reservar nuevamente');

        const copy = await findCopyByIdRepository(copyId, { transaction });

        if (!copy) throw notFoundError('Copia no asociada a la reserva');

        if (copy.idCopy !== reserve.copyId) throw conflictError('Copia no coincide con la reserva');

        if (copy.statusId !== 1) throw conflictError('Ejemplar no está disponible');

        const [loanDate, policy, maxBooks] = await Promise.all([
            getMaxDaysLoanService(),
            getDefaultPolicyService(),
            countLoansByUserRepository(reserve.userId)
        ])

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loanDate);

        if (maxBooks >= policy.maxBooks) throw conflictError('Usuario excede el máximo de préstamos permitidos');

        const loan = await markAsPickUpRepository(id, copy.idCopy, reserve.userId, dueDate, { transaction });
        if (loan.count === 0) throw badRequesError('No se actualizó el estado del préstamo');
        const completedReserve = await markAsCompletedReservationRepository(reserve.idReservation, { transaction });
        if (completedReserve.count === 0) throw badRequesError('No se actualizó el estado de la reserva');
        const statusId = 2;

        const updatedStatusCopy = await updateStatusCopyRepository(copy.idCopy, copy.statusId, statusId, { transaction });
        if (updatedStatusCopy.count === 0) throw badRequesError('No se actualizó el estado de la copia');

        eventEmitter.emit('CREATED_LOAN', loan);

        await transaction.commit();

        return { loan, completedReserve };

    } catch (error) {
        console.error(error);
        await transaction.rollback();
        throw error;
    }
};
