export const responseCommuneDTO = (res) => ({
  id_commune: res.idCommune,
  name: res.name,
  province_id: res.provinceId,
  created_at: res.created_at,
  updated_at: res.updated_at,
});
