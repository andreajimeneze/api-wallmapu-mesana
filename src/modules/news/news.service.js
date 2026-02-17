import { NewsGalleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";

export const getNewsPaginationAndSearchService = async ({
  page,
  limit,
  search,
}) => {
  limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
  page = Number.isInteger(Number(page)) ? Number(page) : 1;

  const DEFAULT_LIMIT = 1;
  const MAX_LIMIT = 100;

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
        pages: 0,
        items: 0,
        next: "none",
        prev: "none",
        result: [],
      }),
    };
  }

  const pages = Math.ceil(items / limit);

  const haveSearch = search && search.trim() !== "";

  if (page > pages && page > 0) {
    page = haveSearch ? 1 : pages;
  } else if (page < 1) {
    page = 1;
  }

  const offset = (page - 1) * limit;

  const result = await NewsModel.findAll({
    where,
    limit,
    offset,
    distinct: true,
    order: [
      ["created_at", "DESC"],
      [{ model: NewsGalleryModel, as: "images" }, "idNewsGallery", "ASC"],
    ],
    include: [
      {
        model: NewsGalleryModel,
        as: "images",
        attributes: ["idNewsGallery", "url", "alt", "newsId"],
      },
    ],
  });

  return {
    response: "Noticias obtenidas exitosamente",
    result: paginationResponseDTO({
      pages,
      items,
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
    order: [
      [{ model: NewsGalleryModel, as: "images" }, "idNewsGallery", "ASC"],
    ],
    include: [
      {
        model: NewsGalleryModel,
        as: "images",
        attributes: ["idNewsGallery", "url", "alt", "newsId"],
      },
    ],
  });

  if (!newsById) {
    throw { code: "NOT_FOUND", message: "Noticia no encontrada" };
  }
  return newsById;
};

export const createNewsService = async ({ title, subtitle, body }) => {
  const existingNews = await NewsModel.findOne({
    where: { title: { [Op.iLike]: title } },
  });

  if (existingNews) {
    throw { code: "CONFLICT", message: "Ya existe una noticia con ese título" };
  }

  return await NewsModel.create({
    title,
    subtitle,
    body,
    created_at: new Date(),
    updated_at: new Date(),
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
