import { CopyModel, EditionModel, ReservationModel, ReservationStatusModel, UserModel } from "../../config/dbSequelize.js"

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
                        as: 'editions',
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
                        as: 'editions',
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
                        as: 'editions',
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
                        as: 'editions',
                        attributes: ['idEdition', 'bookId']
                    }
                ]
            }
        ]
    });
}