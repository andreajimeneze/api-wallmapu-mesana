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
    ? res.editions.map((editions) => ({
        id_editions: editions.ideditions,
        isbn: editions.isbn,
        publication_year: editions.publicationYear,
        pages: editions.pages,
        cover_image: editions.coverImage,
        created_at: editions.createdAt,
        editorial: editions.editorial
          ? {
              id_editorial: editions.editorial.idEditorial,
              name: editions.editorial.name,
            }
          : null,
          copies: editions.copies
          ? editions.copies.map((copies) => ({
            id_copies: copies.idcopies,
            barcode: copies.barcode,
            signature_topography: copies.signatureTopography,
            copies_number: copies.copiesNumber,
            status: copies.status
            ? {
              id_status: copies.status.idStatus,
              name: copies.status.name
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
}