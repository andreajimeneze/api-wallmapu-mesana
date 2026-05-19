import { BookModel, CopyModel, EditionModel, LoanModel, ReservationModel, ReservationStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js"
import { getDefaultPolicyService, getMaxDaysLoanService } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO, reservationResponseDTO, updateReservationDTO } from "./reservation.dto.js";
import { getCopyByIdService } from '../copies/copy.service.js';
import { Op } from "sequelize";
import { Copy } from "../copies/copy.model.js";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/pagination/nomalizePagination.js";
import { calculatePagination } from "../../core/helpers/pagination/calculatePagintation.js";
import { countActiveReservationsByUserRepository, findActiveReservationByCopyRepository, findActiveReservationByUserIdAndCopyRepository, findAllReservationsRepository, findReservationByIdRepository, findReservationPendingByIdRepository, findReservationsByUserIdRepository, findReservesExpireOverdueRepository, getAllReservationWithSearchRepository, markAsPickUpRepository, updateExpireOverdueReservationsRepository, updateStatusCancelReservationRepository } from "./reservation.repository.js";
import { countLoansActiveByUserRepository, countLoansByUserRepository, countLoansOverDueByUserRepository } from "../loans/loan.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { findCopyByIdRepository } from "../copies/copy.repository.js";


export const getReservationsWithSearchService = async (params) => {
    return await getAllPaginationService(params, getAllReservationWithSearchRepository, reservationResponseDTO);
};

export const getAllReservationsService = async () => {
    return await findAllReservationsRepository();
};

export const getReservationByIdService = async (id) => {
    return await findReservationByIdRepository(id);
};

export const getReservationsByUserIdService = async (userId) => {
    return await findReservationsByUserIdRepository(userId);
};

export const getActiveReservationByUserIdAndCopyService = async (userId, copyId) => {
    return await findActiveReservationByUserIdAndCopyRepository(userId, copyId);
};

export const getActiveReservationByCopyService = async (copyId) => {
    return await findActiveReservationByCopyRepository(copyId);
};

export const createCopyReservationService = async (userId, copyId) => {

    const [existingCopy, existingReserve, policy, overdueLoans] = await Promise.all([
        getCopyByIdService(copyId),
        getActiveReservationByUserIdAndCopyService(userId, copyId),
        getDefaultPolicyService(),
        countLoansOverDueByUserRepository(userId)
    ])

    if (!existingCopy) {
        throw new Error('Copia no encontrada');
    };

    if (existingReserve) {
        throw new Error('Ya tienes una reserva activa de este ejemplar');
    };

    if(overdueLoans > 0) {
        throw new Error('No puede realizar reserva con préstamos vencidos');
    }

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

    return await ReservationModel.create(reservation);
};
 
export const getExpireOverdueService = async () => {
    return await findReservesExpireOverdueRepository();
};

export const getReservationPendingById = async (id) => {
    return await findReservationPendingByIdRepository(id);
};

export const updateStatusExpireOverdueReservationsService = async () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return await updateExpireOverdueReservationsRepository(today);
};

export const updateStatusCancelReservationService = async (id, user) => {

    const reservation = await findReservationByIdRepository(id);

    if (!reservation) {
        throw new Error('Reserva no encontrada');
    };

    const isOwner = reservation.userId === user.sub;
    const isAdmin = user.role === 'Admin';

    if (!isAdmin && !isOwner) {
        throw new Error('No tiene autorización para cancelar la reserva');
    };

    return await updateStatusCancelReservationRepository();
};

export const markAsPickUpService = async (id, copyId) => {
    const transaction = await sequelize.transaction();

    try {
        const reserve = await findReservationByIdRepository(id);

        if (!reserve) {
            throw new Error('Reserva no encontrada');
        };

        if (reserve.reservationStatusId === 2) {
            throw new Error('Libro ya retirado. No puede realizar préstamo.');
        };

        if (reserve.reservationStatusId === 3) {
            throw new Error('Reserva fue cancelada. No puede realizar préstamo.');
        };

                if (reserve.reservationStatusId === 4) {
            throw new Error('Reserva vencida. Tiene que volver a reservar el libro.');
        };

        if (reserve.expirationDate < new Date()) {
            throw new Error('No puede entregarse una reserva vencida. Debe reservar nuevamente');
        };

        const copy = await findCopyByIdRepository(copyId);

        if (!copy) {
            throw new Error('Copia no asociada a la reserva');
        }

        if (copy.idCopy !== reserve.copyId) {
            throw new Error('Copia no coincide con la reserva');
        }

        if (copy.statusId !== 1) {
            throw new Error('Ejemplar no está disponible');
        };

        const [loanDate, policy, maxBooks] = await Promise.all([
            getMaxDaysLoanService(),
            getDefaultPolicyService(),
            countLoansByUserRepository(reserve.userId)
        ])

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loanDate);

        if (maxBooks > policy.maxBooks) {
            throw new Error('Usuario excede el máximo de préstamos permitidos');
        }

        const loan = await markAsPickUpRepository(id, copy.idCopy, reserve.userId, dueDate);

        await copy.update({
            statusId: 2
        }, { transaction: transaction });

        await reserve.update({
            reservationStatusId: 2
        }, { transaction: transaction })

        await transaction.commit();

        return loan;

    } catch (error) {
        console.error(error);
        await transaction.rollback();
        throw error;
    }
};
