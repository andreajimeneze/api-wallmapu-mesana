import { NewsGalleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { newsResponseDTO } from "./news.dto.js";

export const getAllNewsSearchRepository = async ({
  page,
  limit,
  search,
  filter
}) => {

  const include = [
    {
      model: NewsGalleryModel,
      as: "images",
      attributes: ["idNewsGallery", "url", "alt", "newsId"],
    },
  ];

  const where = search
    ? {
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { subtitle: { [Op.iLike]: `%${search}%` } },
      ],
    }
    : {};

  const offset = (page - 1) * limit;

  const items = await NewsModel.count({ where, include, distinct: true });

  const result = await NewsModel.findAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: [['created_at', 'DESC']]
  });
  return { count: items, rows: result };
};
export const findNewsByIdRepository = async (id, options = {}) => {
  return await NewsModel.findByPk(id, {
    order: [
      [{ model: NewsGalleryModel, as: "images" }, "idNewsGallery", "ASC"],
    ],
    include: [
      {
        model: NewsGalleryModel,
        as: "images",
        attributes: ["idNewsGallery", "url", "alt", "newsId"],
      },
    ], ...options

  });
};
export const findNewsByTitleRepository = async (title, options = {}) => {
  return await NewsModel.findOne({
    where: { title: { [Op.iLike]: title }, }, ...options
  });
};
export const createNewsRepository = async (newsData, options = {}) => {
  return await NewsModel.create(newsData, options);
};
// export const updateNewsRepository = async (id, newsData, options = {}) => {
//   const [count, updated ] = await NewsModel.update(
//     {
//       ...newsData
//     },
//     {
//       where: {
//         idNews: id
//       }, ...options, returning: true
//     }
//   )
//   return { count: count, updated: updated}
// }

export const updateNewsRepository = async (
  id,
  newsData,
  options = {}
) => {
  const [count, updated] = await NewsModel.update(
    {
      ...newsData,
    },
    {
      where: {
        idNews: id,
      },
      returning: true,
      ...options,
    }
  );

  return {
    count,
    updated,
  };
};
export const deleteNewsRepository = async (id, options = {}) => {
  return await NewsModel.destroy({
    where: {
      idNews: id
    }, ...options
  });
};


