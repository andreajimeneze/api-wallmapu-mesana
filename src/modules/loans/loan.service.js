import { Op } from "sequelize";
import { BookModel, CopyModel, EditionModel, LoanModel, LoanStatusModel, UserModel } from "../../config/dbSequelize.js";
import { loanBasiResponseDTO } from "./loan.dto.js";

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
            attributes: ['idStatus', 'name']
        }
    ];

const where = {};

if (status && parseInt(status) > 0) {
    include[2].where = {
        idStatus: parseInt(status)  // ✅ Usa : no =
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
            data: result.map(loanBasiResponseDTO)
        })
    };
};

export const getAllLoansService = async () => {
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
                as: 'loanStatus'
            }
        ]
    });
};

export const getLoanByIdService = async (id) => {
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
                as: 'loanStatus'
            }
        ]
    })
};

export const getActiveLoansByUserIdService = async (userId) => {
    return LoanModel.findAll({
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
                as: 'loanStatus'
            }
        ]
    })
};

export const getActiveLoansByCopyIdService = async (copyId) => {
    return await LoanModel.findAll({
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
                as: 'loanStatus'
            }
        ]
    })
};

export const getActiveLoansByBookIdService = async (bookId) => {
    return await LoanModel.findAll({
        where: {
            loanStatusId: {
                [Op.in]: [1,3]
            }
        },
        include: [
            {
                model: CopyModel,
                as: 'copy',
                required: true,
                include: [
                    {
                        model: EditionModel,
                        as: 'edition',
                        required: true,
                        include: [
                            {
                                model: BookModel,
                                as: 'book',
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
                required: false
            },
            {
                model: LoanStatusModel,
                as: 'loanStatus',
                required: false
            }
        ]
    })
};

export const getLoansOverDueService = async () => {
    return LoanModel.findAll({
        where: {
            dueDate: {
                [Op.lt]: new Date()
            },
            loanStatusId: 1
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
                as: 'loanStatus'
            }
        ]
    })
};

export const createLoanService = async (loanData) => {
    return await LoanModel.create(loanData);
};