export const responseProvinceDTO = (res) => ({
    id_province: res.idProvince,
    province: res.province,
    region_id: res.regionId,
    created_at: res.createdAt,
    updated_at: res.updatedAt,
    region: res.region
    ? {
        id_region: res.region.idRegion,
        region: res.region.region
    } :
    {}
})