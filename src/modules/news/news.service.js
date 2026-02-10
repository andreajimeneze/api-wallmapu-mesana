import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";

export const getAllNewsService = async ({ page, limit, search }) => {
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;
  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  const searchNomalized = search === "null" ? null : search;
  const where = searchNomalized
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${searchNomalized}%` } },
            { subtitle: { [Op.iLike]: `%${searchNomalized}%` } },
          ],
        }
      : {};

  const total = await NewsModel.count({
    where
  });

  if(total === 0) {
    return {
      response: "No se encontraron noticias",
      result: paginationResponseDTO({
        total: 0,
        pages: 0,
        next: 'none',
        prev: 'none',
        result: []
      })
  }
}

  const pages = Math.ceil(total / limit);
  
  if(page > pages) {
    page = pages;
  }
   const offset = (page - 1) * limit;

   const result = await NewsModel.findAll({
    where,
    limit,
    offset,
    order: [["created_at", "DESC"]],
    distinct: true,
    include: [
      {
        model: News_galleryModel,
        as: "images",
        attributes: ["id_news_gallery", "url", "alt", "id_news"],
      },
    ],
   })
  const nextPage = (page < pages) ? page + 1 : null;
  const prevPage = (page > 1) ? page - 1 : null;

  return {
    response: "Noticias obtenidas exitosamente",
    result: paginationResponseDTO({
      total,
      pages,
      next:
        page < pages
          ? `/news?page=${nextPage}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/news?page=${prevPage}&items=${limit}&search=${search}`
          : null,
      result: result.map(newsResponseDTO),
    }),
  };
};

export const getOneNewsService = async (id) => {
  const newsById = await NewsModel.findByPk(id, {
    include: [
      {
        model: News_galleryModel,
        as: "images",
        attributes: ["id_news_gallery", "url", "alt", "id_news"],
      },
    ],
  });

  if (!newsById) {
    throw { code: "NOT_FOUND", message: "Noticia no encontrada" };
  }
  return newsById;
};

export const createNewsService = async (newsData) => {
  return await NewsModel.create({
    ...newsData,
    created_at: new Date(),
  });
};

export const updateNewsService = async (id, newsData) => {
  const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;
  return await newsSelected.update({
    ...newsData,
    updated_at: new Date(),
  });
};

export const deleteNewsService = async (id) => {
  const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;
  await newsSelected.destroy();
  return true;
};
