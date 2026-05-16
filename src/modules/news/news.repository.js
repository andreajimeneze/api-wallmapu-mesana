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

    const items = await NewsModel.count({ include, distinct: true });

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
  //const { transaction } = options;

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
    ],
     
  }, {transaction: options.transaction});

//   if (!newsById) {
//     throw { code: "NOT_FOUND", message: "Noticia no encontrada" };
//   }
//   return newsById;
};

export const findNewsByTitleRepository = async (title) => {
    return await NewsModel.findOne({
    where: { title: { [Op.iLike]: title } }
  });
};
export const createNewsRepository = async ({ title, subtitle, body}, options = {}) => {

//   if (existingNews) {
//     throw  new Error("Ya existe una noticia con ese título");
//   }

  const createdNews = await NewsModel.create({
    title,
    subtitle,
    body    
  }, { transaction: options.transaction });
  
  return createdNews
};

export const updateNewsRepository = async (id, newsData, options = {}) => {
  const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;
  return await newsSelected.update({
    ...newsData
  }, { transaction: options.transaction });
};

export const deleteNewsRepository = async (id, options = {}) => {
   const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;

  await newsSelected.destroy({ transaction: options.transaction });

  return true;
};


