import { EditorialModel } from "../../config/dbSequelize.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { editorialResponseDTO } from "./editorial.dto.js";
import { createEditorialRepository, findAllEditorialsRepository, findEditorialByIdRepository, getAllEditorialsPaginationRepository, updateEditorialRepository } from "./editorial.repository.js";

export const getAllEditorialsWithPaginationService = async (params) => {
    return await getAllPaginationService(params, getAllEditorialsPaginationRepository, editorialResponseDTO);
};
export const getAllEditorialsService = async () => {
  return await findAllEditorialsRepository();
}

export const getEditorialByIdService = async (id) => {
  return await findEditorialByIdRepository(id);
};

export const createEditorialService = async (name) => {
  return createEditorialRepository(name);
};

export const updateEditorialService = async (id, name) => {
    return updateEditorialRepository(id, name);
};
