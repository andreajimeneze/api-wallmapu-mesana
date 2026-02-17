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
      transaction 
    );

    const newsId = createdNews.id_news;

    console.log('noticia creada', createdNews);
    console.log("newsId", newsId);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const result = await uploadImageCloud(image.buffer, PATH);

      await createGalleryNewsService(
        {
          alt: alt[i],
          url: result.url,
          newsId,
        },
        transaction
      );
    }
    await transaction.commit();

    return { news: createdNews };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
