import { LoanStatusModel } from "../../config/dbSequelize.js";

export const getAllLoanStatusService = async () => {
    return await LoanStatusModel.findAll();
};