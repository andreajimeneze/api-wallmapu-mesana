import { BookModel, CopyModel, EditionModel, LoanModel, LoanStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js";
import { loanBasicResponseDTO } from "./loan.dto.js";
import { getMaxDaysLoanService } from "../loan_policy/loan_policy.service.js";
import { paginationResponseDTO } from '../../core/responses/paginationResponse.js';
import { Copy } from "../copies/copy.model.js";
import { countLoansOverDueByUserRepository, findActiveLoansByBookIdRepository, findActiveLoansByCopyIdRepository, findActiveLoansByUserIdRepository, findAllLoansRepository, findLoanByIdRepository, findLoansOverDueRepository } from "./loan.repository.js";
import { Op } from "sequelize";
export const getLoansAndSearchService = async ({
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
            model: LoanStatusModel,
            as: 'loanStatus',
            attributes: ['idLoanStatus', 'name']
        }
    ];

    const where = {};

    if (status && parseInt(status) > 0) {
        include[2].where = {
            idLoanStatus: parseInt(status)
        };
    }

    const items = await LoanModel.count({
        include,
        where,
        distinct: true,
        col: 'id_loan'
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

    const result = await LoanModel.findAll({
        where,
        include,
        limit,
        offset,
        distinct: true,
        order: [['created_at', 'DESC']]
    });

    return {
        response: 'Préstamos obtenidos exitosamente',
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
            data: result.map(loanBasicResponseDTO)
        })
    };
};

export const getLoansAndSearchForUserService = async ({
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
            model: LoanStatusModel,
            as: 'loanStatus',
            attributes: ['idLoanStatus', 'name']
        }
    ];

    const where = {
        userId: userId
    };

    if (status && parseInt(status) > 0) {
        include[2].where = {
            idLoanStatus: parseInt(status)
        };
    }

    const items = await LoanModel.count({
        where,
        col: 'id_loan'
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

    const result = await LoanModel.findAll({
        where,
        include,
        limit,
        offset,
        subQuery: false,
        order: [['created_at', 'DESC']]
    });

    return {
        response: 'Préstamos obtenidos exitosamente',
        data: paginationResponseDTO({
            page,
            pages,
            items,
            next:
                page < pages
                    ? `/pagination/user?page=${page + 1}&items=${limit}&search=${search}` : null,
            prev:
                page > 1
                    ? `/pagination/user?page=${page - 1}&items=${limit}&search=${search}` : null,
            data: result.map(loanBasicResponseDTO)
        })
    };
};

export const getAllLoansService = async () => {
    return await findAllLoansRepository();
};

export const getLoanByIdService = async (id) => {
    return await findLoanByIdRepository(id);
};

export const getActiveLoansByUserIdService = async (userId) => {
    return await findActiveLoansByUserIdRepository(userId);
};

export const getActiveLoansByCopyIdService = async (copyId) => {
    return await findActiveLoansByCopyIdRepository(copyId);
};

export const getActiveLoansByBookIdService = async (bookId) => {
    return await findActiveLoansByBookIdRepository(bookId);
};

export const getLoansOverDueService = async () => {
    return await findLoansOverDueRepository();
};

export const getLoansOverDueByUserIdService = async (userId) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return await findLoansOverDueRepository(userId, today);
};

// export const countLoansOverDueByUserService = async (userId) => {
//     return await countLoansOverDueByUserRepository(userId);
// };

export const createLoanService = async (loanData) => {
    const loanPolicy = await getMaxDaysLoanService();
    console.log('loanPolicy en createLoanService: ', loanPolicy);
    const loanDate = new Date();
    const maxDays = loanPolicy.maxDays ? loanPolicy.maxDays : 14;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + maxDays);
    dueDate.setHours(23, 59, 59, 999);

    const maxBooks = await LoanModel.count({
        where: {
            userId: loanData.userId,
            loanStatusId: {[Op.in]: [1, 3]}
        }
    });

    if (maxBooks >= loanPolicy.maxBooks) {
        const error = new Error('Usuario excede el número de préstamos autorizados');
        error.status = 409;
        throw error;
    };

    const overdueLoans = await getLoansOverDueByIdService(loanData.userId);

    if (overdueLoans != null) {
        const error = new Error('Usuario tiene un préstamo vencido');
        error.status = 409;
        throw error;
    };

    return await LoanModel.create({
        userId: loanData.userId,
        copyId: loanData.copyId,
        loanDate: loanDate,
        dueDate: dueDate,
        loanStatusId: 1
    });
};

export const returnLoanByCopyIdService = async (copyId) => {

    const loan = await getActiveLoansByCopyIdService(copyId);

    if (!loan) {
        throw new Error('No existe préstamo activo para este ejemplar');
    };

    const copy = await CopyModel.findOne({
        where: {
            idCopy: loan.copyId
        }
    });

    if (!copy) {
        throw new Error('No existe copia asociado al préstamo');
    };

    if (loan.loanStatusId == 2) {
        throw new Error('Ejemplar ya fue devuelto');
    };

    const transaction = await sequelize.transaction();

    try {
        const updatedLoan = await loan.update({
            loanStatusId: 2
        }, { transaction });
        const updatedCopy = await copy.update({
            statusId: 1
        }, { transaction });

        await transaction.commit();

        // return {
        //     loan: updatedLoan,
        //     copy: updatedCopy            
        // }

        return updatedLoan
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

};

export const markLoanAsExpireOverdueService = async () => {
    const [affectedRows] = await LoanModel.update(
        { loanStatusId: 3 },
        {
            where: {
                dueDate: {
                    [Op.lt]: new Date()
                },
                loanStatusId: 1
            }
        }
    );

    return affectedRows;
};

export const getActiveLoanByBarcodeService = async (barcode) => {
    return await LoanModel.findOne({
        where: {
            loanStatusId: {
                [Op.in]: [1]
            }
        },
        include: [
            {
                model: CopyModel,
                as: 'copy',
                required: true,
                where: {
                    barcode: barcode
                },
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        required: true,
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
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                //attributes: [['idLoanStatus', 'id_status'],
                //    'name']
            }
        ]
    })
}