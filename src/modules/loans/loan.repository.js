import { LoanModel, UserModel, CopyModel, EditionModel, BookModel, LoanStatusModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";

export const getAllLoansAndSearchRepository = async ({
    page,
    limit,
    search,
    filter
}) => {
    const { userId, idLoanStatus } = filter || {};

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
            attributes: ['idLoanStatus', 'name'],
            required: true
        }
    ];

    const where = {};

    if (idLoanStatus && parseInt(idLoanStatus) > 0) {
        include[2].where = {
            idLoanStatus: parseInt(idLoanStatus)
        };
    }

    if (userId) {
        where.userId = userId
    }

    const offset = (page - 1) * limit;

    const items = await LoanModel.count({ include, distinct: true });

    const result = await LoanModel.findAll({
        where,
        include,
        limit,
        offset,
        distinct: true,
        order: [['created_at', 'DESC']]
    });
    return { count: items, rows: result };
};
export const findAllLoansRepository = async () => {
    return await LoanModel.findAll({
        order: [['loanDate', 'DESC']],
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy'
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    });
};

export const findLoanByIdRepository = async (id) => {
    return await LoanModel.findByPk(id, {
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy'
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    })
};

export const findActiveLoansByUserIdRepository = async (userId) => {
    return await LoanModel.findAll({
        where: {
            userId: userId,
            loanStatusId: {
                [Op.in]: [1, 3]
            }
        },
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy'
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    })
};

export const countLoansOverDueByUserRepository = async (userId) => {
    return await LoanModel.count({
        where: {
            userId: userId,
            loanStatusId: 3
        }
    })
};

export const countLoansActiveByUserRepository = async (userId) => {
    return await LoanModel.count({
        where: {
            userId: userId,
            loanStatusId: 1
        }
    })
};

export const countLoansByUserRepository = async (userId) => {
    return await LoanModel.count({
        where: {
            userId: userId,
            loanStatusId: { [Op.in]: [1, 3] }
        }
    })
}

export const findActiveLoansByCopyIdRepository = async (copyId) => {
    return await LoanModel.findOne({
        where: {
            copyId: copyId,
            loanStatusId: {
                [Op.in]: [1, 3]
            }
        },
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy'
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    })
};

export const findActiveLoansByBookIdRepository = async (bookId) => {
    return await LoanModel.findAll({
        where: {
            loanStatusId: {
                [Op.in]: [1, 3]
            }
        },
        include: [
            {
                model: CopyModel,
                as: 'copy',
                required: true,
                attributes: ['idCopy', 'barcode'],
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        required: true,
                        include: [
                            {
                                model: BookModel,
                                as: 'book',
                                attributes: ['idBook', 'title'],
                                required: true,
                                where: {
                                    idBook: bookId
                                }
                            }
                        ]
                    },
                ]
            },
            {
                model: UserModel,
                as: 'user',
                attributes: ['idUser', 'username', 'userlastname'],
                required: false
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name'],
                required: false
            }
        ]
    })
};

export const findLoansOverDueRepository = async () => {
    return await LoanModel.findAll({
        where: {
            dueDate: {
                [Op.lt]: new Date()
            },
            loanStatusId: 3
        },
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy',
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
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    })
};

export const getLoansOverDueByIdRepository = async (userId, dueDate) => {

    return await LoanModel.findOne({
        where: {
            dueDate: {
                [Op.lt]: dueDate
            },
            userId: userId
        },
        include: [
            {
                model: UserModel,
                as: 'user'
            },
            {
                model: CopyModel,
                as: 'copy',
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
                model: LoanStatusModel,
                as: 'loanStatus',
                attributes: ['idLoanStatus', 'name']
            }
        ]
    })
};

export const createLoanRepository = async (loanData, options = {}) => {
    return await LoanModel.create(loanData, { transaction: options.transaction });
};

export const returnLoanByCopyIdRepository = async (copyId, options = {}) => {
    return await LoanModel.update(
        {
            loanStatusId: 2
        },
        {
            where: {
                copyId: copyId
            },
            ...options
        })
};

export const markLoanAsExpireOverdueRepository = async () => {
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

export const findActiveLoanByBarcodeRepository = async (barcode) => {
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