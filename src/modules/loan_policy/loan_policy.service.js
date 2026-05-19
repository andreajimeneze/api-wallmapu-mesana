import { notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { findDefaultLoanPolicyRepository, getMaxDaysLoanRepository, getReservationDaysRepository } from "./loan_policy.repository.js";


export const getDefaultPolicyService = async () => {
    const defaultPolicy = await findDefaultLoanPolicyRepository();
    if(!defaultPolicy) throw notFoundError();
    return defaultPolicy;
};

export const getMaxDaysLoanService = async () => {
    const policy = await getMaxDaysLoanRepository();
    if(!policy) throw notFoundError();
    return policy ? policy.maxDays : 14;
};

export const getReservationDaysService = async () => {
    const policy = await getReservationDaysRepository();
    if(!policy) throw notFoundError();
     return policy ? policy.reservationDays : 3;
}; 