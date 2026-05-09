import { EditorialModel } from "../../config/dbSequelize.js";
import { createEditorialRepository, findAllEditorialsRepository, findEditorialByIdRepository, updateEditorialRepository } from "./editorial.repository.js";

export const getAllEditorialsService = async () => {
    return await findAllEditorialsRepository();
};

export const getEditorialByIdService = async (id) => {
  return await findEditorialByIdRepository(id);
};

export const createEditorialService = async (name) => {
  return createEditorialRepository(name);
};

export const updateEditorialService = async (id, name) => {
    return updateEditorialRepository(id, name);
};
