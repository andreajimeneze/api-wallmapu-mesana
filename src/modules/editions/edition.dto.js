export const editionResponseDTO = (res) => {
  if (!res) return null;

  return {
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
          genre: res.book.genre
            ? {
                id_genre: res.book.genre.idGenre,
                name: res.book.genre.name,
              }
            : null,
        }
      : null,

    editorial: res.editorial
      ? {
          id_editorial: res.editorial.idEditorial,
          name: res.editorial.name,
        }
      : null,
      
    // 🔥 CORREGIDO: Validar que copies exista y sea un array
    copies: res.copies && Array.isArray(res.copies)
      ? res.copies.map((copy) => ({
          id_copy: copy.idCopy,
          barcode: copy.barcode,
          signature_topography: copy.signatureTopography,
          copy_number: copy.copyNumber,
          status: copy.status
            ? {
                id_status: copy.status.idStatus,
                name: copy.status.name,
              }
            : null,
        }))
      : [], // Si no hay copies, retornar array vacío
  };
};

export const createEditionDTO = ({
  edition,
  isbn,
  publication_year,
  pages,
  cover_image,
  book_id,
  editorial_id,
}) => {
  return {
    edition,
    isbn,
    publicationYear: publication_year,
    pages: pages,
    coverImage:
      typeof cover_image === "object" && cover_image !== null
        ? cover_image.url
        : cover_image,
    bookId: Number(book_id),
    editorialId: Number(editorial_id),
  };
};

export const updateEditionDTO = (data) => {
  const dto = {};

  // Solo incluir campos que NO sean coverImage
  if (data.id_edition !== undefined) dto.idEdition = data.id_edition;
  if (data.isbn !== undefined) dto.isbn = data.isbn;
  if (data.publication_year !== undefined)
    dto.publicationYear = data.publication_year;
  if (data.cover_image != undefined) dto.coverImage = data.cover_image;
  if (data.pages !== undefined) dto.pages = data.pages;
  if (data.book_id !== undefined) dto.bookId = data.book_id;
  if (data.editorial_id !== undefined) dto.editorialId = data.editorial_id;
  if (data.created_at !== undefined) dto.created_at = data.created_at;
  if (data.updated_at !== undefined) dto.updated_at = data.updated_at;

  return dto;
};

export const editionDetailDTO = (detail) => ({});
