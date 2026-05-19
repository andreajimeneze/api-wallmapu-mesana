export const baseLoanPolicyDTO = (res) => ({
    id_policy: res.idPolicy,
    name: res.name,
    max_books: res.maxBooks,
    max_days: res.maxDays,
    reservation_days: res.reservationDays,
    fine_per_day: res.finePerDay
});

