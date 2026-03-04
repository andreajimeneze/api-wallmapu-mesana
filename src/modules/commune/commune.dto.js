export const responseCommuneDTO = (res) => ({
  id_commune: res.idCommune,
  commune: res.commune,
  province_id: res.provinceId,
  created_at: res.created_at,
  updated_at: res.updated_at,
  province: res.province
    ? {
        id_province: res.province.idProvince,
        province: res.province.province,
        region_id: res.province.regionId,
      }
    : {},
});
