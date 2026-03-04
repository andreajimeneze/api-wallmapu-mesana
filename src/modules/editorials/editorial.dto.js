export const editorialResponseDTO = (res) => ({
  id_editorial: res.idEditorial,
  editorial: res.editorial,
  created_at: res.created_at,
  updated_at: res.updated_at
});

export const createEditorialResponseDTO = ( editorial ) => {
  return {
    editorial: editorial.trim()
  };
};
