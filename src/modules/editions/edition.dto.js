export const editionResponseDTO = (res) => ({
  id_edition: res.idEdition,
  edition: res.edition,
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
        authors: res.book.authors
          ? res.book.authors.map((author) => ({
              id_author: author.idAuthor,
              name: author.name,
            }))
          : [],
        subjects: res.book.subjects
          ? res.book.subjects.map((subject) => ({
              id_subject: subject.idSubject,
              name: subject.name,
            }))
          : [],
        genre: res.book.genre,
      }
    : null,

  editorial: res.editorial
    ? {
        id_editorial: res.editorial.idEditorial,
        name: res.editorial.name,
      }
    : null,

  copies: res.copies
    ? res.copies.map((copy) => ({
        id_copy: copy.idCopy,
        barcode: copy.barcode,
        signature_topography: copy.signatureTopography,
        copy_number: copy.copyNumber,
        status_id: copy.statusId,
      }))
    : [],
});

export const createEditionDTO = ({
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id,
}) => {
  return {
    isbn,
    publicationYear: publication_year,
    pages: pages,
    coverImage: typeof cover_image === 'object' && cover_image !== null ?
    cover_image.url : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
  };
};

export const updateEditionDTO = ({edition, isbn, publication_year, pages, cover_image, book_id, editorial_id}) => {
  return {
    edition: edition.trim(),
    isbn: isbn.trim(),
    publicationYear: publication_year.trim(),
    pages: pages,
    coverImage: cover_image.trim(),
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
  };
};

export const editionDetailDTO = (detail) => ({});
