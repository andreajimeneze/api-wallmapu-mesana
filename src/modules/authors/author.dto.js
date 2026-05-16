export const baseAuthorDTO = (author) => ({
  id_author: author.idAuthor,
  name: author.name,
  created_at: author.created_at,
  updated_at: author.updated_at,
});

export const authorResponseDTO = (author) => ({
  id_author: author.idAuthor,
  name: author.name,
  created_at: author.created_at,
  updated_at: author.updated_at,
});

export const updateAuthorDTO = (data) => ({
    idAuthor: data.id_author,
    name: data.name.trim()
})