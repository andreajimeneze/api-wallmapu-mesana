export const bookResponseDTO = (res) => ({
  id_book: res.idBook,
  title: res.title,
  summary: res.summary,
  created_at: res.created_at,
  updated_at: res.updated_at,
  genre: res.genre
    ? {
        id_genre: res.genre.idGenre,
        name: res.genre.name,
      }
    : null,
});
