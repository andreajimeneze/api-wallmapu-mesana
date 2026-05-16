import { findAllCommunesRepository } from "./commune.repository.js";

export const getAllCommuneService = async () => {
    return await findAllCommunesRepository();    
};