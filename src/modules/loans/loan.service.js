import { BookModel, CopyModel, EditionModel, LoanModel, LoanStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js";
import { loanBasicResponseDTO } from "./loan.dto.js";
import { getMaxDaysLoanService } from "../loan_policy/loan_policy.service.js";
import { paginationResponseDTO } from '../../core/responses/paginationResponse.js';
import { Copy } from "../copies/copy.model.js";
import { countLoansByUserRepository, createLoanRepository, findActiveLoanByBarcodeRepository, findActiveLoansByBookIdRepository, findActiveLoansByCopyIdRepository, findActiveLoansByUserIdRepository, findAllLoansRepository, findLoanByIdRepository, findLoansOverDueRepository, getAllLoansAndSearchRepository, getLoansOverDueByIdRepository, markLoanAsExpireOverdueRepository, returnLoanByCopyIdRepository } from "./loan.repository.js";
import { Op } from "sequelize";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { getCopyByIdService, updateCopyService } from "../copies/copy.service.js";
export const getLoansAndSearchService = async (params) => {
    return await getAllPaginationService(params, getAllLoansAndSearchRepository, loanBasicResponseDTO);
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
    const loanDate = new Date();
    const maxDays = loanPolicy.maxDays ? loanPolicy.maxDays : 14;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + maxDays);
    dueDate.setHours(23, 59, 59, 999);

    const maxBooks = await countLoansByUserRepository(userId);

    if (maxBooks >= loanPolicy.maxBooks) {
       throw new Error('Usuario excede el número de préstamos autorizados');
    };

    const overdueLoans = await getLoansOverDueByIdRepository(loanData.userId);

    if (overdueLoans != null) {
        throw new Error('Usuario tiene un préstamo vencido');
    };

    return await createLoanRepository({
        userId: loanData.userId,
        copyId: loanData.copyId,
        loanDate: loanDate,
        dueDate: dueDate,
        loanStatusId: 1
    });
};

export const returnLoanByCopyIdService = async (copyId) => {

    const loan = await findActiveLoansByBookIdRepository(copyId);

    if (!loan) {
        throw new Error('No existe préstamo activo para este ejemplar');
    };

    const copy = await getCopyByIdService(copyId);
    

    if (!copy) {
        throw new Error('No existe copia asociada al préstamo');
    };

    if (loan.loanStatusId == 2) {
        throw new Error('Ejemplar ya fue devuelto');
    };

    const transaction = await sequelize.transaction();

    try {
        const updatedLoan = await returnLoanByCopyIdRepository(copyId, { transaction });
        const updatedCopy = await updateCopyService(copy.idCopy, {statusId: 1}, { transaction })

        await transaction.commit();

        return updatedLoan
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

};

export const markLoanAsExpireOverdueService = async () => {
    return await markLoanAsExpireOverdueRepository();
};

export const getActiveLoanByBarcodeService = async (barcode) => {
    return await findActiveLoanByBarcodeRepository(barcode);
};