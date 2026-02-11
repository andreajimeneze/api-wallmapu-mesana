import { generateFileName } from "../../shared/images/generateFileName.js";
import { resizeImage } from "../../shared/images/resizeImage.js";
import { presetsImage } from "../../shared/presets/presetsImage.js";
import { saveImageFile } from "../../shared/images/saveImage.js";

import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";

export const createGalleryNewsService = async ({ news_id, alt, file }) => {
  const existingNews = await NewsModel.findByPk(news_id);

  if (!existingNews) {
    throw new Error("Imagen no puede ser asociada a una noticia inexistente");
  }

  const imageName = generateFileName("news-image", news_id, "webp");

  const createdGallery = await News_galleryModel.create({
    alt,
    url: imageName,
    news_id,
  });

  if (createdGallery) {
    const resizeBuffer = await resizeImage(file.buffer, presetsImage.newsGallery,
    );
    await saveImageFile(process.cwd(), "news-gallery", imageName, resizeBuffer);
  }

  return createdGallery;
};

export const getGalleryByNewsService = async (news_id) => {
  return await News_galleryModel.findAll({
    where: { news_id },
    attributes: ["id_news_gallery", "alt", "url", "news_id"],
    order: [["id_news_gallery", "ASC"]],
  });
};
