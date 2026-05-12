import { BookModel, CopyModel, EditionModel, ReservationModel, ReservationStatusModel, UserModel } from "../../config/dbSequelize.js";

export const findAllReservationsRepository = async () => {
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

export const findReservationByIdRepository= async (id) => {
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
                attributes: ['idCopy', 'barcode', 'copyNumber', 'signatureTopography', 'statusId'],
                required: false,
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        required: false,
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
        ]
    });
};

export const findReservationsByUserIdRepository= async (userId) => {
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

export const countActiveReservationsByUserRepository = async (userId) => {
     return await ReservationModel.count({
                where: {
                    userId: userId,
                    reservationStatusId: 1
                }
            })
};

export const findActiveReservationByUserIdAndCopyRepository = async (userId, copyId) => {
    return await ReservationModel.findOne({
        where: {
            userId: userId,
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

export const findActiveReservationByCopyRepository = async (copyId) => {
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

export const createCopyReservationRepository = async (reservationData) => {
    return await ReservationModel.create(reservationData);
};

export const findExpireOverdueRepository = async () => {
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

export const findReservationPendingByIdRepository = async (id) => {
    return ReservationModel.findOne({
        where: {
            idReservation: id,
            reservationStatusId: 1
        }
    });
};

export const updateStatusExpireOverdueReservationsRepository = async () => {
    const [updatedStatusCount] = await ReservationModel.update(
        { reservationStatusId: 4 },
        {
            where: {
                reservationStatusId: 1,
                expirationDate: {
                    [Op.lte]: today
                }
            }
        })
    return updatedStatusCount;
};

export const updateStatusCancelReservationRespository = async (id) => {
    const [updatedStatusCount] = await ReservationModel.update(
        {
            reservationStatusId: 3
        },
        {
            where: {
                idReservation: id,
                reservationStatusId: 1,
            }
        });

    return updatedStatusCount;
};

export const markAsPickUpService = async (id, copyId, userId, dueDate) => {
        
        return await LoanModel.create({
            userId: userId,
            loanDate: new Date(),
            dueDate: dueDate,
            loanStatusId: 1,
            copyId: copyId
        });
};
