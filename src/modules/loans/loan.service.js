import { Op } from "sequelize";
import { BookModel, CopyModel, EditionModel, LoanModel, LoanStatusModel, UserModel } from "../../config/dbSequelize.js";

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