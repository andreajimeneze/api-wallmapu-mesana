import { createNewsService } from "../../modules/news/news.service.js";
import { createGalleryByNewsIdService } from "../../modules/news-gallery/news-gallery.service.js";
import { uploadImageCloud } from "../../services/images/cloudinary.service.js";
import { NewsModel, NewsGalleryModel } from "../../config/dbSequelize.js";
import { sequelize } from "../../config/dbSequelize.js";

const PATH = "news";

export const createNewsWithImagesService = async ({
  title,
  subtitle,
  body,
  alt = [],
  images = [],
}) => {
  console.log("titulo", title);

  // Validaciones
  if (!Array.isArray(images)) {
    throw new Error("Formato de imágenes, inválido");
  }
  if (!images || images.length === 0) {
    throw new Error("Debe subir al menos una imagen");
  }

  if (!Array.isArray(alt)) {
    throw new Error("Formato de textos alternativos de imágenes, inválido");
  }

  if (images.length !== alt.length) {
    throw new Error("Cada imagen debe contar con texto alternativo");
  }

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

    const newsId = createdNews.id_news;

    const uploadPromises = images.map((image) =>
      uploadImageCloud(image.buffer, PATH),
    );

    const uploadResults = await Promise.all(uploadPromises);

    console.log("resultado subida", uploadResults);
    for (let i = 0; i < uploadResults.length; i++) {
      await createGalleryByNewsIdService(
        {
          alt: alt[i],
          url: uploadResults[i].url,
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
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }

  
};
