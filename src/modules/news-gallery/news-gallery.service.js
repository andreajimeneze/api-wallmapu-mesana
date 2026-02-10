import { generateFileName } from "../../shared/images/generateFileName.js";
import { resizeImage } from "../../shared/images/resizeImage.js";
import { presetsImage } from "../../shared/presets/presetsImage.js";
import { saveImageFile } from "../../shared/images/saveImage.js";

import { News_galleryModel, NewsModel } from "../../config/dbSequelize.js";

export const createGalleryNewsService = async ({ id_news, alt, file }) => {
  const existingNews = await NewsModel.findByPk(id_news);

  if (!existingNews) {
    throw new Error("Imagen no puede ser asociada a una noticia inexistente");
  }

  const imageName = generateFileName("news-image", id_news, "webp");

  const createdGallery = await News_galleryModel.create({
    alt,
    url: imageName,
    id_news,
  });

  if (createdGallery) {
    const resizeBuffer = await resizeImage(file.buffer, presetsImage.newsGallery,
    );
    await saveImageFile(process.cwd(), "news-gallery", imageName, resizeBuffer);
  }

  return createdGallery;
};

export const getGalleryByNewsService = async (id_news) => {
  return await News_galleryModel.findAll({
    where: { id_news },
    attributes: ["id_news_gallery", "alt", "url", "id_news"],
    order: [["id_news_gallery", "ASC"]],
  });
};
