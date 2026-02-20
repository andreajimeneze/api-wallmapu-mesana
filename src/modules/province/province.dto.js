export const responseProvinceDTO = (res) => ({
    id_province: res.idProvince,
    province: res.province,
    region_id: res.regionId,
    region: res.region
    ? {
        id_region: res.region.idRegion,
        region: res.region.region
    } :
    {}
})