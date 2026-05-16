import { findAllRegionsRepository } from "./region.repository.js";

export const getAllRegionsService = async () => {
    return await findAllRegionsRepository();
};