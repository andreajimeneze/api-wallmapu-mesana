import { Op } from "sequelize";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";
import { createNewsRepository, deleteNewsRepository, findNewsByIdRepository, findNewsByTitleRepository, getAllNewsSearchRepository, updateNewsRepository } from "./news.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";



export const getNewsPaginationAndSearchService = async (params) => {
   return await getAllPaginationService(params, getAllNewsSearchRepository, newsResponseDTO);
};

export const getNewsByIdService = async (id) => {
  const news = await findNewsByIdRepository(id);
  if (!news) throw notFoundError("Noticia no encontrada");
  return news;
};

export const createNewsService = async ({ title, subtitle, body}, options = {}) => {
  const news = await findNewsByTitleRepository(title, options);
  if (news) throw conflictError("Ya existe una noticia con ese título");
  
  return await createNewsRepository({title, subtitle, body}, options);
};

export const updateNewsService = async (id, newsData) => {
  const { count, updated } = await updateNewsRepository(id, newsData);
  if(count === 0) throw notFoundError();
  console.log('updated news: ', updated);
  return updated 
};

export const deleteNewsService = async (id, options = {}) => {
  const news = await findNewsByIdRepository(id, options);
  if(!news) throw notFoundError();
     await deleteNewsRepository(id, options);
    return true;
};


