import { LoanPolicyModel } from "../../config/dbSequelize.js";

export const findDefaultLoanPolicyRepository = async () => {
    return await LoanPolicyModel.findOne({
    });
};

export const getMaxLoanService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.maxDays : 14;
};

export const getReservationDaysService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.reservationDays : 3;
}; 

export const updateLoanPolicyRepository = async (id, policyData) => {
    const selectedPolicy = await LoanPolicyModel.findByPk(id);

    if (!selectedPolicy) {
        throw new Error('No existe política de préstamo solicitada');
    };

    return await selectedPolicy.update(policyData);
};