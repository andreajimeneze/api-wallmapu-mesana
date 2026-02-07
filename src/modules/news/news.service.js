import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";

export const getAllNewsService = async ({ limit, offset }) => {
  return await NewsModel.findAndCountAll({
    limit,
    offset,
    order: [["created_at", "DESC"]],
    include: [
      {
        model: News_galleryModel,
        as: "gallery",
        attributes: ["id_news_gallery", "img", "alt", 'id_news'],
      },
    ],
  });
};

export const getOneNewsService = async (id) => {
  return await NewsModel.findByPk(id);
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
