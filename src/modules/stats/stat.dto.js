export const stateAdminResponseDTO = (stat) => ({
    users: stat.users || 0,
    news:stat.news || 0,
    authors: stat.authors || 0,
    editorials: stat.editorials || 0,
    books: stat.books || 0,
    loans: stat.loans || 0,
    reservations: stat.reservations || 0
})