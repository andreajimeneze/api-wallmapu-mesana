import {
  sequelize,
  AuthorModel,
  BookModel,
  CopyModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  CopyStatusModel,
} from "../../config/dbSequelize.js";
import { editionDetailDTO, editionForBookResponseDTO, updateEditionDTO } from "./edition.dto.js";
import { paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
import { Op } from "sequelize";
import {
  deleteImageCloud,
  extractPublicId,
} from "../../core/lib/cloudinary.service.js";
import { createEditionRepository, deleteEditionRepository, findAllEditionsRepository, findEditionByBooIdRepository, findEditionByBookIdDetailRepository, findEditionByIdRepository, getAllEditionPaginationRepository, updateEditionRepository } from "./editions.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";

export const getAllEditionPaginationService = async (params) => {
 return await getAllPaginationService(params, getAllEditionPaginationRepository, editionForBookResponseDTO);
};

export const getAllEditionsService = async () => {
  return await findAllEditionsRepository();
};

export const getEditionByIdService = async (id) => {
  const edition = await findEditionByIdRepository(id);
  if (!edition) {
    return null;
  }
  return edition;
};

export const getEditionByBookIdDetailService = async (idBook) => {
  const edition = await findEditionByBookIdDetailRepository(idBook);

  if(!edition) {
    throw new Error("No existe edición para el libro");
  }

  return edition;
};

export const getEditionByBookIdService = async (idBook) => {
  const edition = await findEditionByBooIdRepository(idBook);

  if(!edition) {
    throw new Error("No existen ediciones para el libro");
  }

  return edition;
};

export const createEditionService = async (editionData) => {
  return await createEditionRepository(editionData);
};

export const updateEditionService = async (id, editionData) => {
  await updateEditionRepository(id, editionData);
  const edited = await findEditionByIdRepository(id);
  if(!edited) return null
  
  return edited;
};

export const deleteEditionWithImageService = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const edition = await findEditionByIdRepository(id);
    const copyEdition = await CopyModel.count({ where: { editionId: id } });

    if (!edition) {
      await transaction.rollback();
      throw new Error("Edición no encontrada");
    }

    if (copyEdition > 0) {
      await transaction.rollback();
      throw new Error(
        `Edición ${edition.edition} tiene copias asociadas. Debe eliminar las copias primero`,
      );
    }

    const coverImage = edition.coverImage;

    if (coverImage && coverImage.trim() !== "") {
      const publicId = extractPublicId(coverImage);

      await deleteImageCloud(publicId);
    }
    await deleteEditionRepository(id, { transaction });
    await transaction.commit();
    return true;
  } catch (error) {
    if (transaction.finished !== 'commit' && transaction.finished !== 'rollback') {
      await transaction.rollback();
    }
    throw error;
  }
};
