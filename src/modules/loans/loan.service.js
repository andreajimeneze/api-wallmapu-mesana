import { BookModel, CopyModel, EditionModel, LoanModel, LoanStatusModel, sequelize, UserModel } from "../../config/dbSequelize.js";
import { loanBasicResponseDTO } from "./loan.dto.js";
import { getMaxDaysLoanService } from "../loan_policy/loan_policy.service.js";
import { paginationResponseDTO } from '../../core/responses/paginationResponse.js';
import { Copy } from "../copies/copy.model.js";
import { countLoansByUserRepository, createLoanRepository, findActiveLoanByBarcodeRepository, findActiveLoanByCopyIdRepository, findLoansOverDueRepository, getAllLoansAndSearchRepository, getLoansOverDueByIdRepository, markLoanAsExpireOverdueRepository, returnLoanByIdRepository } from "./loan.repository.js";
import { Op } from "sequelize";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { getCopyByIdService, updateCopyService } from "../copies/copy.service.js";
import { badRequestError, conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { findCopyByIdRepository, updateStatusCopyRepository } from "../copies/copy.repository.js";

export const getLoansAndSearchService = async (params) => {
    return await getAllPaginationService(params, getAllLoansAndSearchRepository, loanBasicResponseDTO);
};
export const getLoansOverDueService = async () => {
    return await findLoansOverDueRepository();
};
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

    if (overdueLoans !== null) {
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
export const returnLoanByCopyIdService = async (copyId, options = {}) => {
    const transaction = await sequelize.transaction();
    try {
        const loan = await findActiveLoanByCopyIdRepository(copyId, { transaction });
        if (!loan) throw notFoundError();

        if (loan.loanStatusId === 2) throw conflictError('Ejemplar ya fue devuelto');

        const copy = await findCopyByIdRepository(copyId, { transaction });
        if (!copy) throw notFoundError();
        if (copy.statusId !== 2) throw conflictError('Copia no se encuentra prestada');

        const statusId = 1;
        const {count, updatedLoan} = await returnLoanByIdRepository(loan.idLoan, { transaction });
        if(count === 0) throw conflictError('No se actualizó el registro');
        const updatedCopy = await updateStatusCopyRepository(copyId, copy.statusId, statusId, { transaction })
        if(updatedCopy === 0) throw badRequesError('No se actualizó el estado de la copia');
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
    const activeLoan = await findActiveLoanByBarcodeRepository(barcode);
    if (!activeLoan) throw notFoundError();
    return activeLoan;
};