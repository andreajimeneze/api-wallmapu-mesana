import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";
import { Op } from "sequelize";

export const getAllNewsService = async ({ limit, offset, search }) => {
  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { subtitle: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  return await NewsModel.findAndCountAll({
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
  });
};

export const getOneNewsService = async (id) => {
  return await NewsModel.findByPk(id,{  include: [
      {
        model: News_galleryModel,
        as: "images",
        attributes: ["id_news_gallery", "url", "alt", 'id_news'],
      },
    ],});
};

export const createNewsService = async (newsData) => {
  return await NewsModel.create({
    ...newsData,
    created_at: new Date()
  });
};

export const updateNewsService = async (id, newsData) => {
  const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;
  return await newsSelected.update({
    ...newsData,
    updated_at: new Date()
  });
};

export const deleteNewsService = async (id) => {
  const newsSelected = await NewsModel.findByPk(id);

  if (!newsSelected) return null;
  await newsSelected.destroy();
  return true;
};
