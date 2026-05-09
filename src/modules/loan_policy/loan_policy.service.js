import { LoanPolicyModel } from "../../config/dbSequelize.js";
import { findDefaultLoanPolicyRepository, updateLoanPolicyRepository } from "./loan_policy.repository.js";


export const getDefaultPolicyService = async () => {
    return await findDefaultLoanPolicyRepository();
};

export const getMaxLoanService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.maxDays : 14;
};

export const getReservationDaysService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.reservationDays : 3;
}; 

export const updateLoanPolicyService = async (id, policyData) => {
    return updateLoanPolicyRepository(id, policyData);
};