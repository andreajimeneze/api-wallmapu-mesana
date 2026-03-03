export const editorialResponseDTO = (editorial) => ({
  id_editorial: editorial.idEditorial,
  editorial: editorial.editorial,
  created_at: editorial.createdAt,
  updated_at: editorial.updatedAt
});

export const createEditorialResponseDTO = ({ editorial }) => {
  return {
    editorial: editorial.trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
