import { NewsGalleryModel, sequelize } from "../../config/dbSequelize.js";
import { getGalleryByNewsIdService } from "../../modules/news-gallery/news-gallery.service.js";
import { getNewsByIdService } from "../../modules/news/news.service.js";
import {
  deleteImageCloud,
  extractPublicId,
} from "../../services/images/cloudinary.service.js";

export const deleteNewsAndImages = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const news = await getNewsByIdService(id, { transaction });

    if (!news) {
      await transaction.rollback();
      return null;
    }

    const gallery = await getGalleryByNewsIdService(id, { transaction });

    const publicIds = (gallery || [])
      .map((img) => extractPublicId(img.url))
      .filter(Boolean);

    await NewsGalleryModel.destroy({
      where: { newsId: id },
      transaction
    });

    await Promise.all(publicIds.map((id) => deleteImageCloud(id)));

    await news.destroy({ transaction });

    await transaction.commit();

    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
