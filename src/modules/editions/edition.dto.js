export const editionResponseDTO = (res) => ({
  id_edition: res.idEdition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  created_at: res.created_at,
  updated_at: res.updated_at,
  book: res.book
    ? {
        id_book: res.book.idBook,
        title: res.book.title,
        summary: res.book.summary,
      }
    : null,
  editorial: res.editorial
    ? {
        id_editorial: res.editorial.idEditorial,
        name: res.editorial.name,
      }
    : null,
});
