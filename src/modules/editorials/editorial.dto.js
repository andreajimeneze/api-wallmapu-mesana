export const baseEditorialDTO = (res) => ({
  id_editorial: res.idEditorial,
  name: res.name,
  created_at: res.created_at,
  updated_at: res.updated_at,
});

export const editorialResponseDTO = (res) => ({
  id_editorial: res.idEditorial,
  name: res.name,
  created_at: res.created_at,
  updated_at: res.updated_at,
});