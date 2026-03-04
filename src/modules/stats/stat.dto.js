export const stateAdminResponseDTO = (stat) => ({
    users: stat.users,
    news:stat.news,
    regions: stat.regions,
    provinces: stat.provinces,
    communes: stat.communes,
    authors: stat.authors,
    editorials: stat.editorials,
    subjects: stat.subjects || 0,
    books: stat.books || 0
})