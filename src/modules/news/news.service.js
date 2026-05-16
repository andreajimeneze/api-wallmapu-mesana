import { NewsGalleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";
import { createNewsRepository, deleteNewsRepository, findNewsByIdRepository, findNewsByTitleRepository, getAllNewsSearchRepository, updateNewsRepository } from "./news.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";



export const getNewsPaginationAndSearchService = async (params) => {
   return await getAllPaginationService(params, getAllNewsSearchRepository, newsResponseDTO);
};

export const getNewsByIdService = async (id) => {
 // const { transaction } = options;

  const newsById = await findNewsByIdRepository(id);

  if (!newsById) {
    throw new Error("Noticia no encontrada");
  }
  return newsById;
};

export const createNewsService = async ({ title, subtitle, body}) => {
  const existingNews = await findNewsByTitleRepository(title);

  if (existingNews) {
    throw  new Error("Ya existe una noticia con ese título");
  }

  return await createNewsRepository(title, subtitle, body);
};

export const updateNewsService = async (id, newsData) => {
  return await updateNewsRepository(id, newsData);
};

export const deleteNewsService = async (id, options = {}) => {
    return await deleteNewsRepository(id);
};


