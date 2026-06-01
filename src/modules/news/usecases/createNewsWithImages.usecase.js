import { createNewsService, updateNewsService } from "../news.service.js";
import { createGalleryByNewsIdService } from "../../news-gallery/news-gallery.service.js";
import { NewsModel, NewsGalleryModel, sequelize } from "../../../config/dbSequelize.js";
import { findNewsByIdRepository } from "../news.repository.js";

const PATH = "news";

export const createNewsWithImagesService = async ({
  newsData,
  alts,
  files,
  options = {}
}
) => {
  const transaction = await sequelize.transaction();

  try {
    const createdNews = await createNewsService(newsData, { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
  }
};

export const updateNewsWithImagesService = async ({
  id,
  newsData,
  alts = [],
  files = []
}) => {

  const transaction = await sequelize.transaction();

  try {

    const updatedNews = await updateNewsService(
      id,
      newsData,
      { transaction }
    );

    if (files.length > 0) {

      await createGalleryByNewsIdService(
        {
          newsId: Number(id),
          files,
          alts
        },
        { transaction }
      );
    }

    await transaction.commit();

    return updatedNews;

  } catch (error) {

    await transaction.rollback();
    throw error;
  }
};