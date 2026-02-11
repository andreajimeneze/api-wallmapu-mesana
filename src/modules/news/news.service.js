import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";

export const getNewsPaginationAndSearchService = async ({
  page,
  limit,
  search,
}) => {
  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  const DEFAULT_LIMIT = 1;
  const MAX_LIMIT = 50;

  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  } else if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { subtitle: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const items = await NewsModel.count({
    where,
  });

  if (items === 0) {
    return {
      response: "No se encontraron noticias",
      result: paginationResponseDTO({
        items: 0,
        pages: 0,
        next: "none",
        prev: "none",
        result: [],
      }),
    };
  }

  const pages = Math.ceil(items / limit);

  if (page > pages) {
    page = pages;
  } else if (page < 1) {
    page = 1;
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
        attributes: ["id_news_gallery", "url", "alt", "news_id"],
      },
    ],
  });

  return {
    response: "Noticias obtenidas exitosamente",
    result: paginationResponseDTO({
      items,
      pages,
      next:
        page < pages
          ? `/news?page=${page + 1}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/news?page=${page - 1}&items=${limit}&search=${search}`
          : null,
      result: result.map(newsResponseDTO),
    }),
  };
};

export const getNewsByIdService = async (id) => {
  const newsById = await NewsModel.findByPk(id, {
    include: [
      {
        model: News_galleryModel,
        as: "images",
        attributes: ["id_news_gallery", "url", "alt", "news_id"],
      },
    ],
  });

  if (!newsById) {
    throw { code: "NOT_FOUND", message: "Noticia no encontrada" };
  }
  return newsById;
};

export const createNewsService = async ({title, subtitle, body}) => {
  const existingNews = await NewsModel.findOne({where : {title}});
  if(existingNews) {
    throw { code: "CONFLICT", message: "Ya existe una noticia con ese título" };
  }


  return await NewsModel.create({
    title,
    subtitle,
    body,
    created_at: new Date(),
    updated_at: new Date()
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
