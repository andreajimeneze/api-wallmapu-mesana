export const bookResponseDTO = (res) => ({
  id_book: res.idBook,
  title: res.title,
  summary: res.summary,
  genre_id: res.genreId,
  created_at: res.created_at,
  updated_at: res.updated_at,

  genre: res.genre
    ? {
        id_genre: res.genre.idGenre,
        name: res.genre.name,
      }
    : null,

  authors: res.authors
    ? res.authors.map((author) => ({
        id_author: author.idAuthor,
        name: author.name,
      }))
    : [],

  subjects: res.subjects
    ? res.subjects.map((subject) => ({
        id_subject: subject.idSubject,
        name: subject.name,
      }))
    : [],

  editions: res.editions
    ? res.editions.map((edition) => ({
        id_edition: edition.idEdition,
        edition: edition.edition,
        isbn: edition.isbn,
        publication_year: edition.publicationYear,
        pages: edition.pages,
        cover_image: edition.coverImage,
        created_at: edition.createdAt,
        editorial: edition.editorial
          ? {
              id_editorial: edition.editorial.idEditorial,
              name: edition.editorial.name,
            }
          : null,
          copies: edition.copies
          ? edition.copies.map((copy) => ({
            id_copy: copy.idCopy,
            barcode: copy.barcode,
            signature_topography: copy.signatureTopography,
            copies_number: copy.copiesNumber,
            status: copy.status
            ? {
              id_status: copy.status.idStatus,
              name: copy.status.name
            } : null
          })) : []
      }))
    : [],
});

export const createBookDTO = ({title,
  summary,
  genre_id,
  authors = [],
  subjects = []}) => {
    if(!title?.trim() || !genre_id || authors.length === 0 || subjects.length === 0 ) {
      throw new Error('Debe completar los campos título, género, autores y descriptores');
    }

    return {
      title: title.trim(),
      summary,
      genre_id: Number(genre_id),
      authors: authors.map(author => Number(author.id_author)),
      subjects: subjects.map(subject => Number(subject.id_subject))
    }
};

export const updateBookDTO = ({ idBook, title, summary, genreId, authors = [], subjects = []}) => {
  return {
    idBook: Number(idBook),
    title: title.trim(),
    summary,
    genre_id: genreId ? Number(genreId) : undefined,
    authors: authors.map(author => Number(author.id_author)),
    subjects: subjects.map(subject => Number(subject.id_subject))
  }
};


export const BookDetailDTO = (book) => {
  if (!book) return null;
  
  return {
    id_book: book.idBook,
    title: book.title,
    summary: book.summary,
    authors: book.authors?.map(author => ({
      id_author: author.idAuthor,
      name: author.name
    })) || [],
    subjects: book.subjects?.map(subject => ({
      id_subject: subject.idSubject,
      name: subject.name
    })) || [],
    genre: book.genre ? {
      id_genre: book.genre.idGenre,
      name: book.genre.name
    } : null
  };
};