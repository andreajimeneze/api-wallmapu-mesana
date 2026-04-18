import { BookModel, CopyModel, EditionModel, ReservationModel, ReservationStatusModel, UserModel } from "../../config/dbSequelize.js"
import { getDefaultPolicy } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO } from "./reservation.dto.js";
import { getCopyByIdService } from '../copies/copy.service.js';
import { Op } from "sequelize";

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
                as: 'copy',
                attributes: ['idCopy', 'barcode', 'signatureTopography', 'copyNumber', 'statusId'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        attributes: ['idEdition', 'bookId'],
                        include: [
                            {
                                model: BookModel,
                                as: 'book',
                                attributes: ['idBook', 'title']
                            }
                        ]
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
                as: 'copy',
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
                as: 'copy',
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
            reservationStatusId: {
                [Op.ne]: 1
            }
        },
        include: [
            {
                model: CopyModel,
                as: 'copy',
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
            reservationStatusId: 1
        },
        include: [
            {
                model: CopyModel,
                as: 'copy',
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

    console.log('user en create service: ', userId);
    console.log('copia en create service: ', copyId);
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
        userId,
        copyId,
        expirationDate,
        reservationStatusId: 1
    });

   return await ReservationModel.create(reservation);

    //return await getReservationByIdService(createdReservation.idReservation);
};

export const getExpireOverdueService = async () => {
    return ReservationModel.findAll({
        where: {
            expirationDate: {
                [Op.lt]: new Date()
            }
        },
        include: [
            {
                model: CopyModel,
                as: 'copy'
            },
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: ReservationStatusModel,
                as: 'reservationStatus'
            }
        ]
    });


};

export const getReservationPendingById = async (id) => {
    return ReservationModel.findOne({
        where: {
            idReservation: id,
            reservationStatusId: 1
        }
    });
};

export const updateStatusReservationsService = async() => {
    const [updatedStatusCount ] = await ReservationModel.update(
        {reservationStatusId: 4},
    {
        where: {
            reservationStatusId: 1,
            expirationDate: {
                [Op.lt]: new Date()
            }
        }
    })
    return updatedStatusCount;
}

