export const stateAdminResponseDTO = (stat) => ({
    users: stat.users || 0,
    news:stat.news || 0,
    books: stat.books || 0,
    loans: stat.loans || 0,
    reservations: stat.reservations || 0
});

export const adminResponseDTO = (admin) => ({
    users: admin.users || 0,
    news:admin.news || 0,
    authors: admin.authors || 0,
    editorials: admin.editorials || 0,
    books: admin.books || 0,
    subjects: admin.subjects || 0,
    communes: admin.communes || 0,
    provinces: admin.provinces || 0,
    regions: admin.regions || 0    
});

export const userStatesDTO = (user) => ({
    total_borrowed: user.historicLoans,
    active_loans: user.activeLoans,
    overdue_loans: user.overdueLoans
})
