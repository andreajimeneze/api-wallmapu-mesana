import { CopyModel, EditionModel, ReservationModel, ReservationStatusModel, UserModel } from "../../config/dbSequelize.js"
import { getDefaultPolicy } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO } from "./reservation.dto.js";
import { getCopyByIdService } from '../copies/copy.service.js';

export const getAllReservationsService = async () => {
    return await ReservationModel.findAll({
        include: [
            {
                model: UserModel,
                as: 'user',
                attributes: ['idUser', 'username', 'userlastname', 'email']
            },
            {
                model: CopyModel,
                as: 'copies',
                attributes: ['idCopy', 'barcode', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            },
            {
                model: ReservationStatusModel,
                as: 'reservationStatus',
                attributes: ['idStatus', 'name']
            }
        ],
        order: [['reservationDate', 'DESC']]
    });
};

export const getReservationByIdService = async (id) => {
    return await ReservationModel.findByPk(id, {
        include: [
            {
                model: UserModel,
                as: 'user',
                attributes: ['idUser', 'username', 'userlastname', 'email']
            },
            {
                model: CopyModel,
                as: 'copies',
                attributes: ['idCopy', 'barcode', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            },
            {
                model: ReservationStatusModel,
                as: 'reservationStatus',
                attributes: ['idStatus', 'name']
            }
        ]
    });
};

export const getReservationsByUserIdService = async (userId) => {
    return await ReservationModel.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: UserModel,
                as: 'user',
                attributes: ['idUser', 'username', 'userlastname', 'email']
            },
            {
                model: CopyModel,
                as: 'copies',
                attributes: ['idCopy', 'barcode', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            },
            {
                model: ReservationStatusModel,
                as: 'reservationStatus',
                attributes: ['idStatus', 'name']
            }
        ]
    })
};

export const getActiveReservationByUserIdAndCopyService = async (userId, copyId) => {
    return await ReservationModel.findOne({
        where: {
            userId: userId,
            copyId: copyId,
            statusId: 1
        },
        include: [
            {
                model: CopyModel,
                as: 'copies',
                attributes: ['idCopy', 'barcode', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            }
        ]
    });
};

export const getActiveReservationByCopyService = async (copyId) => {
    return await ReservationModel.findOne({
        where: {
            copyId: copyId,
            statusId: 1
        },
        include: [
            {
                model: CopyModel,
                as: 'copies',
                attributes: ['idCopy', 'barcode', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            }
        ]
    });
};

export const createCopyReservationService = async (userId, copyId) => {


    const existingCopy = await getCopyByIdService(copyId);

    if(!existingCopy) {
        throw new Error('Copia no existe');
    };

    const existingReserve = await getActiveReservationByUserIdAndCopyService(userId, copyId);

    if(existingReserve) {
        throw new Error('Ya tienes una reserva activa de este ejemplar');
    };

    const policy = await getDefaultPolicy();

    const reservationDays = policy ?.reservationDays ?? 3;

    const expirationDate = new Date(Date.now() + reservationDays * 24 * 60 * 60 * 1000);

    const reservation = createReservationDTO ({
        userId: userId,
        copyId: copyId,
        expirationDate: expirationDate,
        reservationStatusId: 1
    });

    const createdReservation = await ReservationModel.create(reservation);

    return await getReservationByIdService(createdReservation.idReservation);
};