export const authorResponseDTO = (author) => ({
  id_author: author.idAuthor,
  name: author.name,
  created_at: author.created_at,
  updated_at: author.updated_at,
});

export const createAuthorDTO = ({author}) => {
  return {
    name: author.name
  }
}
