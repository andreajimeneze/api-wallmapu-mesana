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
  publicationYear,
  pages,
  coverImage,
  bookId,
  editorialId,
}) => {
  return {
    isbn,
    publicationYear: publicationYear.trim(),
    pages: pages.trim(),
    coverImage,
    bookId: Number(bookId),
    editorialId: Number(editorialId),
  };
};

export const updateEditionDTO = (edition) => {
  return {
    id_edition: Number(edition.idEdition),
    isbn: edition.isbn,
    publication_year: edition.publicationYear,
    pages: edition.pages,
    cover_image: edition.coverImage,
    book_id: Number(edition.bookId),
    editorial_id: Number(edition.editorialId),
  };
};

export const editionDetailDTO = (detail) => ({});
