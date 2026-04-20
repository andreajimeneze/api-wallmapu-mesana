import { LoanPolicyModel } from "../../config/dbSequelize.js";

export const getAllLoanPoliciesService = async () => {
    return await LoanPolicyModel.findAll();
};

export const getLoanPolicyByIdService = async (id) => {
    return await LoanPolicyModel.findByPk(id);
};

export const getDefaultPolicy = async () => {
    const policy = await LoanPolicyModel.findOne();

    return policy ? policy.reservationDays : 3;
};

export const getMaxLoanService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.maxDays : 14;
};

export const getReservationDaysService = async () => {
    const policy = await LoanPolicyModel.findOne();
    return policy ? policy.reservationDays : 3;
}; 

export const createLoanPolicyService = async (policyData) => {
    return await LoanPolicyModel.create(policyData);
};

export const updateLoanPolicyService = async (id, policyData) => {
    const selectedPolicy = await LoanPolicyModel.findByPk(id);

    if (!selectedPolicy) {
        throw new Error('No existe política de préstamo solicitada');
    };

    return await selectedPolicy.update(policyData);
};

export const deletePolicyService = async (id) => {
    const selectedPolicy = await LoanPolicyModel.findByPk(id);

    if (!selectedPolicy) {
        throw new Error('No existe política de préstamo solicitada');
    };

    await selectedPolicy.destroy();

    return true;
};