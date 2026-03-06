export const editionResponseDTO = (res) => ({
  id_edition: res.idEdition,
  isbn: res.isbn,
  publication_year: res.publicationYear,
  pages: res.pages,
  cover_image: res.coverImage,
  book_id: res.bookId,
  editorial_id: res.editorial_id,
  created_at: res.created_at,
  updated_at: res.updated_at
});
