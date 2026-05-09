import { findAllLoanStatusRepository } from "./loan-status.repository.js";

export const getAllLoanStatusService = async () => {
    return await findAllLoanStatusRepository();
};