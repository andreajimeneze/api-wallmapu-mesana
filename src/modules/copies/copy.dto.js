export const copyResponseDTO = (res) => ({
  id_copy: res.idCopy,
  barcode: res.barcode,
  signature_topography: res.signatureTopography,
  copy_number: res.copyNumber,
  created_at: res.created_at,
  updated_at: res.updated_at,
  edition: res.edition
    ? {
        id_edition: res.edition.idEdition,
        isbn: res.edition.isbn,
        publication_year: res.edition.publicationYear,
        pages: res.edition.pages,
        cover_image: res.edition.coverImage,
        book: res.edition.book
          ? {
              id_book: res.edition.book.idBook,
              title: res.edition.book.title,
              summary: res.edition.book.summary,
              genre: res.edition.book.genre
              ? {
                id_genre: res.edition.book.genre.idGenre,
                name: res.edition.book.genre.name
              } : null,
            }
          : null,
        editorial: res.edition.editorial
          ? {
              id_editorial: res.edition.editorial.idEditorial,
              name: res.edition.editorial.name,
            }
          : null,
      }
    : null,

  status: res.status
    ? {
        id_copy_status: res.status.idStatus,
        name: res.status.name,
      }
    : null
});
