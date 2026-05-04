import { BookModel, CopyModel, EditionModel, LoanModel, ReservationModel, ReservationStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js"
import { getDefaultPolicyService, getMaxLoanService } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO, reservationResponseDTO, updateReservationDTO } from "./reservation.dto.js";
import { getCopyByIdService } from '../copies/copy.service.js';
import { Op } from "sequelize";
import { Copy } from "../copies/copy.model.js";
//import { createPaginationService } from "../../core/services/basePagination.service.js";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { calculatePagination } from "../../core/helpers/calculatePagintation.js";


export const getReservationsAndSearchService = async ({
    page,
    limit,
    search,
    status
}) => {
    
      const { page: currentPage, limit: currentLimit } =
      normalizePagination(page, limit);

    const include = [
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
    ];

const where = {};

if (status && parseInt(status) > 0) {
    include[2].where = {
        idStatus: parseInt(status) 
    };
}

    const items = await ReservationModel.count({
        include,
        where,
        distinct: true,
        col: 'id_reservation'
    });

    if (items === 0) {
        return {
            response: 'No se encontraron reservas',
            data: paginationResponseDTO({
                page: 0,
                pages: 0,
                items: 0,
                next: 'none',
                prev: 'none',
                data: []
            })
        };
    };


    const { page: safePage, pages, offset} = calculatePagination(items, currentPage, currentLimit);
 

    const result = await ReservationModel.findAll({
        where,
        include,
        limit,
        offset,
        distinct: true,
        order: [['reservationDate', 'DESC']]
    });

    return {
        response: 'Reservas obtenidas exitosamente',
        data: paginationResponseDTO({
            page,
            pages,
            items,
            next:
                page < pages
                    ? `/pagination?page=${page + 1}&items=${limit}&search=${search}` : null,
            prev:
                page > 1
                    ? `/pagination?page=${page - 1}&items=${limit}&search=${search}` : null,
            data: result.map(reservationResponseDTO)
        })
    };
};

export const getReservationsAndSearchForUserService = async ({
    page,
    limit,
    search,
    status,
    userId
}) => {

    limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
    page = Number.isInteger(Number(page)) ? Number(page) : 1;

    const DEFAULT_LIMIT = 10;
    const MAX_LIMIT = 100;

    limit = Number(limit) || DEFAULT_LIMIT;
    page = Number(page) || 1;

    if (limit < 1) limit = DEFAULT_LIMIT;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const include = [
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
    ];

const where = {
    userId: userId
};

if (status && parseInt(status) > 0) {
    include[2].where = {
        idStatus: parseInt(status)
    };
}

    const items = await ReservationModel.count({
        where,
        col: 'id_reservation'
    });

    if (items === 0) {
        return {
            response: 'No se encontraron reservas',
            data: paginationResponseDTO({
                page: 0,
                pages: 0,
                items: 0,
                next: 'none',
                prev: 'none',
                data: []
            })
        };
    };

    const pages = Math.ceil(items / limit);

    if (page > pages && page > 0) {
        page = search ? 1 : pages;
    } else if (page < 1) {
        page = 1;
    };

    const offset = (page - 1) * limit;

    const result = await ReservationModel.findAll({
        where,
        include,
        limit,
        offset,
        subQuery: false,
        order: [['reservationDate', 'DESC']]
    });

    return {
        response: 'Reservas obtenidas exitosamente',
        data: paginationResponseDTO({
            page,
            pages,
            items,
            next:
                page < pages
                    ? `/pagination?page=${page + 1}&items=${limit}&search=${search}` : null,
            prev:
                page > 1
                    ? `/pagination?page=${page - 1}&items=${limit}&search=${search}` : null,
            data: result.map(reservationResponseDTO)
        })
    };
};

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

    const [existingCopy, existingReserve, policy] = await Promise.all([
        getCopyByIdService(copyId),
        getActiveReservationByUserIdAndCopyService(userId, copyId),
        getDefaultPolicyService()
    ])

    if (!existingCopy) {
        const error = new Error('Copia no encontrada');
        error.status = 404;
        throw error;
    };

    if (existingReserve) {
        const error = new Error('Ya tienes una reserva activa de este ejemplar');
        error.status = 409;
        throw error;
    };

    const reservationDays = policy?.reservationDays ?? 3;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + reservationDays);
    expirationDate.setHours(23, 59, 59, 999);

    const [maxBooksReservated, maxBooksLoaned] = await Promise.all([
        ReservationModel.count({
            where: {
                userId: userId,
                reservationStatusId: 1
            }
        }),
        LoanModel.count({
            where: {
                userId: userId,
                loanStatusId: 1
            }
        })
    ])

    if (maxBooksReservated + maxBooksLoaned >= policy.maxBooks) {
        const error = new Error('Usuario excede número de reservas y préstamos autorizados');
        error.status = 409;
        throw error;
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

export const updateStatusExpireOverdueReservationsService = async () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);



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

export const updateStatusCancelReservationService = async (id, user) => {

    const reservation = await ReservationModel.findOne({
        where: {
            idReservation: id
        }
    });

    if (!reservation) {
        throw new Error('Reserva no encontrada');
    };

    const isOwner = reservation.userId === user.sub;
    const isAdmin = user.role === 'Admin';

    if (!isAdmin && !isOwner) {
        throw new Error('No tiene autorización para cancelar la reserva');
    };

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

export const markAsPickUpService = async (id, copyId) => {
    const transaction = await sequelize.transaction();

    try {
        const reserve = await ReservationModel.findByPk(id, {
            include: [
                {
                    model: CopyModel,
                    as: 'copy',
                    attributes: ['idCopy', 'statusId', 'barcode', 'signatureTopography'],
                    required: true,
                    include: [
                        {
                            model: EditionModel,
                            as: 'edition',
                            include: [
                                {
                                    model: BookModel,
                                    as: 'book'
                                }
                            ]
                        }
                    ]
                },
                {
                    model: UserModel,
                    as: 'user'
                }
            ],
            transaction: transaction,
        });

        if (!reserve) {
            const error = new Error('Reserva no encontrada');
            error.status = 404;
            throw error;
        };

        if (reserve.reservationStatusId !== 1) {
            const error = new Error('No puede marcar como retirada una reserva pendiente');
            error.status = 409;
            throw error;
        };

        if (reserve.expirationDate < new Date()) {
            const error = new Error('No puede entregarse una reserva vencida. Debe reservar nuevamente');
            error.status = 409;
            throw error;
        };

        const copy = reserve.copy;

        if (!copy) {
            const error = new Error('Copia no asociada a la reserva');
            error.status = 409;
            throw error;
        }

        if (copy.idCopy !== copyId) {
            const error = new Error('Copia no coincide con la reserva');
            error.status = 409;
            throw error;
        }
        if (copy.statusId !== 1) {
            const error = new Error('Ejemplar no está disponible');
            error.status = 409;
            throw error;
        };

        const [loanDate, policy, maxBooks] = await Promise.all([
            getMaxLoanService(),
            getDefaultPolicyService(),
            LoanModel.count({
                where: {
                    userId: reserve.userId
                }
            })
        ])

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loanDate);

        if (maxBooks > policy.maxBooks) {
            const error = new Error('Usuario excede el máximo de préstamos permitidos');
            error.status = 409;
            throw error;
        }

        const loan = await LoanModel.create({
            userId: reserve.userId,
            loanDate: new Date(),
            dueDate: dueDate,
            loanStatusId: 1,
            copyId: copy.idCopy
        }, { transaction: transaction });

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
