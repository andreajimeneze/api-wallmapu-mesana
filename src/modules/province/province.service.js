import { ProvinceModel, RegionModel } from "../../config/dbSequelize.js";

export const getAllProvincesService = async () => {
    return await ProvinceModel.findAll({
        include: [{
            model: RegionModel,
            as: 'region',
            attributes: ['idRegion', 'region']
        }]
    });
}

export const getProvinceByIdService = async (id) => {
    return await ProvinceModel.findByPk(id, {
        include: [{
            model: RegionModel,
            as: 'region',
            attributes: ['idRegion', 'region']
        }]
    });
}