import { ProvinceModel, RegionModel } from "../../config/dbSequelize.js";
import { findAllProvincesWithRegionRepository, findProvinceByIdWhitRegionRepository } from "./province.repository.js";

export const getAllProvincesService = async () => {
    return await findAllProvincesWithRegionRepository();
};

export const getProvinceByIdService = async (id) => {
    return findProvinceByIdWhitRegionRepository(id);
};