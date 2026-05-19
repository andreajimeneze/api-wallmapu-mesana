import { LoanPolicyModel } from "../../config/dbSequelize.js";

export const findDefaultLoanPolicyRepository = async () => {
    return await LoanPolicyModel.findOne({
    });
};

export const getMaxDaysLoanRepository = async () => {
    return await LoanPolicyModel.findOne();
  
};

export const getReservationDaysRepository = async () => {
    return await LoanPolicyModel.findOne();
}; 
