export const responseProvinceDTO = (res) => ({
    id_province: res.idProvince,
    province: res.province,
    region_id: res.regionId,
    created_at: res.created_at,
    updated_at: res.updated_at,
    region: res.region
    ? {
        id_region: res.region.idRegion,
        region: res.region.region
    } :
    {}
})