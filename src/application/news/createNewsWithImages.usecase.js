import { createNewsService } from "../../modules/news/news.service.js";
import { createGalleryNewsService } from "../../modules/news-gallery/news-gallery.service.js";
import { uploadImageCloud } from "../../services/images/cloudinary.service";

const PATH = "news";

export const createNewsWithImagesService = async ({
  title,
  subtitle,
  body,
  alt = [],
  images = [],
}) => {
  const transaction = await sequelize.transaction();

  try {
    const createdNews = await createNewsService(
      {
        title,
        subtitle,
        body,
      },
      { transaction },
    );

    const newsId = createdNews.id_news;

    const uploadImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const result = await uploadImageCloud(image.buffer, PATH);

      const createdGallery = await createGalleryNewsService(
        {
          alt: alt[i],
          url: result.url,
          newsId,
        },
        { transaction },
      );

      uploadImages.push(createdGallery);
    }
    await transaction.commit();

    return { news, uploadImages };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
