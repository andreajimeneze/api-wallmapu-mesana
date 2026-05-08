import { ProvinceModel } from "../../config/dbSequelize.js";

export const findAllProvincesWithRegionRepository = async () => {
    return ProvinceModel.findAll({
            order: [['province', 'ASC']],
            include: [{
                model: RegionModel,
                as: 'region',
                attributes: ['idRegion', 'region']
            }]
        });
};

export const findProvinceByIdWhitRegionRepository = async (id) => {
    return ProvinceModel.findByPk(id, {
            include: [{
                model: RegionModel,
                as: 'region',
                attributes: ['idRegion', 'region']
            }]
        });
};