import { editionForBookResponseDTO } from "./edition.dto.js";
import { paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import {
  deleteImageCloud,
  extractPublicId,
} from "../../core/lib/cloudinary.service.js";
import { createEditionRepository, deleteEditionRepository, findEditionsByBookIdDetailRepository, findEditionByIdRepository, getAllEditionPaginationRepository, updateEditionRepository } from "./editions.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { existingCopiesByEditionRepository } from "../copies/copy.repository.js";
import { sequelize } from "../../config/dbSequelize.js";
import { foreignKeyError, uniqueConstraintError, validationError } from "../../core/helpers/errors/databaseErrors.js";
import { updateEditionFormatService } from "../edition_format/edition_format.service.js";

export const getAllEditionPaginationService = async (params) => {

  return await getAllPaginationService(params, getAllEditionPaginationRepository, editionForBookResponseDTO);
};
export const getEditionByIdService = async (id) => {
  const edition = await findEditionByIdRepository(id);
  if (!edition) throw notFoundError();
  return edition;
};
export const getEditionsByBookIdDetailService = async (idBook) => {
  return await findEditionsByBookIdDetailRepository(idBook);
};
export const createEditionService = async (editionData) => {
  
  try {
    return await createEditionRepository(editionData);

  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      throw validationError();
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw uniqueConstraintError();
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw foreignKeyError();
    }
    throw error;
  }
};
export const updateEditionService = async (id, editionData, options = {}) => {

  const transaction = await sequelize.transaction();
  try {
    const { idEdition, formatIds, ...editionFields} = editionData;
    
    const updated  = await updateEditionRepository(id, editionFields, { transaction });
    if (!updated) throw notFoundError();

    const editonFormat = await updateEditionFormatService(id, formatIds, { transaction });
    
    await transaction.commit();
    return updated;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const deleteEditionWithImageService = async (id) => {
  const edition = await findEditionByIdRepository(id);
  if (!edition) {
    throw notFoundError();
  }

  const copyEdition = await existingCopiesByEditionRepository(id);
  if (copyEdition > 0) {
    throw conflictError(
      `Edición ${edition.edition} tiene copias asociadas. Debe eliminar las copias primero`
    );
  }

  const transaction = await sequelize.transaction();

  try {
    await deleteEditionRepository(id, { transaction });
    await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    if (error.name === "SequelizeValidationError") {
      throw validationError();
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw uniqueConstraintError();
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw foreignKeyError();
    }
    throw error;
  }

  const coverImage = edition.coverImage;

  if (coverImage?.trim()) {

    const publicId = extractPublicId(coverImage);

    await deleteImageCloud(publicId);
  }

  return true;
};
