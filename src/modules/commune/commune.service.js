import { findAllCommunsWithProvinceRepository, findCommuneByIdWithProvinceRepository } from "./commune.repository.js";

export const getAllCommuneService = async () => {
    return await findAllCommunsWithProvinceRepository();    
};

export const getCommuneByIdService = async (id) => {
    return await findCommuneByIdWithProvinceRepository(id);
};