import { createNewsService } from "../../modules/news/news.service.js";
import { createGalleryByNewsIdService } from "../../modules/news-gallery/news-gallery.service.js";
import { NewsModel, NewsGalleryModel } from "../../config/dbSequelize.js";
import { sequelize } from "../../config/dbSequelize.js";

const PATH = "news";

export const createNewsWithImagesService = async ({
  title,
  subtitle,
  body,
  alts,
  files,
}) => {
  const transaction = await sequelize.transaction();

  try {
    const createdNews = await createNewsService(
      {
        title,
        subtitle,
        body,
      },
      transaction,
    );

    const newsId = createdNews.idNews;

    if (files && files.length > 0) {
      await createGalleryByNewsIdService(
        {
          alts,
          files,
          newsId,
        },
        transaction,
      );
    }
    await transaction.commit();
    const newsWithImages = await NewsModel.findByPk(newsId, {
      include: [
        {
          model: NewsGalleryModel,
          as: "images",
        },
      ],
    });

    return newsWithImages;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
