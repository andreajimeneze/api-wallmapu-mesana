import { LoanStatusModel } from "../../config/dbSequelize.js";

export const findAllLoanStatusRepository = async () => {
    return await LoanStatusModel.findAll();
};