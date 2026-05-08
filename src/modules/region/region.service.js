import { findAllRegionsRepository, findRegionByIdRepository } from "./region.repository.js";

export const getAllRegionsService = async () => {
    return await findAllRegionsRepository();
};

export const getRegionByIdService = async (id) => {
    return await findRegionByIdRepository(id);
};