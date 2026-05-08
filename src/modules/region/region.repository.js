import { RegionModel } from "../../config/dbSequelize.js";

export const findAllRegionsRepository = async () => {
    return RegionModel.findAll({
        order: [['region', 'ASC']]
    });
};

export const findRegionByIdRepository = async (id) => {
    return RegionModel.findByPk(id);
};