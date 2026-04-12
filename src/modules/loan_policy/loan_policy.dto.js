export const baseLoanPolicyDTO = (res) => ({
    id_policy: res.idPolicy,
    name: res.name,
    max_books: res.maxBooks,
    max_days: res.maxDays,
    reservation_days: res.reservationDays,
    fine_per_day: res.finePerDay
});

export const createLoanPolicyDTO = ({
    name,
    max_books,
    max_days,
    reservation_days,
    fine_per_day
}) => {
    return {
        name: name,
        maxBooks: Number(max_books),
        maxDays: Number(max_days),
        reservationDays: Number(reservation_days),
        finePerDay: Number(fine_per_day)
    }
};

export const updateLoanPolicyDTO = (policyData) => {
    const dto = {};

    if(policyData.name !== undefined) {
        dto.name = policyData.name
    };

    if(policyData.max_books > 0) {
        dto.maxBooks = policyData.max_books
    };

    if(policyData.max_days > 0) {
        dto.maxDays = policyData.max_days
    };

    if(policyData.reservation_days > 0) {
        dto.reservationDays = policyData.reservation_days
    };

    if(policyData.fine_per_day > 0) {
        dto.finePerDay = policyData.fine_per_day
    }

    return dto;
};