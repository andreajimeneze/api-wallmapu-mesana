import { BookModel, CopyModel, EditionModel, LoanModel, ReservationModel, ReservationStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js"
import { getDefaultPolicy, getMaxLoanService } from "../loan_policy/loan_policy.service.js";
import { createReservationDTO, reservationResponseDTO, updateReservationDTO } from "./reservation.dto.js";
import { getCopyByIdService } from '../copies/copy.service.js';
import { Op } from "sequelize";
import { Copy } from "../copies/copy.model.js";
import { createPaginationService } from "../../core/services/basePagination.service.js";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";

export const getReservationsAndSearchService = async ({
    page,
    limit,
    search,
    status
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

const where = {};

if (status && parseInt(status) > 0) {
    include[2].where = {
        idStatus: parseInt(status)  // ✅ Usa : no =
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
    const existingCopy = await getCopyByIdService(copyId);

    if (!existingCopy) {
        throw new Error('Copia no encontrada');
    };

    const existingReserve = await getActiveReservationByUserIdAndCopyService(userId, copyId);

    console.log('reserva encontrada en copyreservation create en servicio: ', existingCopy);
    if (existingReserve) {
        console.log(existingReserve)
        throw new Error('Ya tienes una reserva activa de este ejemplar');
    };

    const policy = await getDefaultPolicy();

    const reservationDays = policy?.reservationDays ?? 3;

    const expirationDate = new Date(Date.now() + reservationDays * 24 * 60 * 60 * 1000);

    const reservation = createReservationDTO({
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

export const updateStatusExpireOverdueReservationsService = async () => {
    const today = new Date();
    //tomorrow.setDate(tomorrow.getDate() + 1);
    today.setHours(0, 0, 0, 0); 

    const [updatedStatusCount] = await ReservationModel.update(
        { reservationStatusId: 4 },
        {
            where: {
                reservationStatusId: 1,
                expirationDate: {
                    [Op.lt]: today
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
            throw new Error('Reserva no encontrada');
        };

        if (reserve.reservationStatusId !== 1) {
            throw new Error('No puede marcar como retirada una reserva pendiente');
        };

        if (reserve.expirationDate < new Date()) {
            throw new Error('No puede entregarse una reserva vencida. Debe reservar nuevamente');
        };

        const copy = await CopyModel.findByPk( copyId, { transaction });

        if (!copy) {
            throw new Error('Copia no asociada a la reserva');
        }

        if (copy.idCopy !== reserve.copyId) {
            throw new Error('Copia no coincide con la reserva');
        }
        if (copy.statusId !== 1) {
            throw new Error('Ejemplar no está disponible');
        };

        const loanDate = await getMaxLoanService();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loanDate);


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
