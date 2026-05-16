import { ProvinceModel, RegionModel } from "../../config/dbSequelize.js";
import { findAllProvincesRepository } from "./province.repository.js";

export const getAllProvincesService = async () => {
    return await findAllProvincesRepository();
};
