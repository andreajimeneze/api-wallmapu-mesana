import { RegionModel } from "../../config/dbSequelize.js";

export const getAllRegionsService = async () => {
    return await RegionModel.findAll({
        order: [['region', 'ASC']]
    });
}

export const getRegionByIdService = async (id) => {
    return await RegionModel.findByPk(id);
}