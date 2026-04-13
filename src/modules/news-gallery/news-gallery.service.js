import {
  deleteImageCloud,
  extractPublicId,
  uploadImageCloud169,
} from "../../core/services/cloudinary.service.js";
import { NewsGalleryModel, NewsModel } from "../../config/dbSequelize.js";
import { generateFileName } from "../../core/utils/generateFileName.js";

const path = "news";

export const createGalleryByNewsIdService = async (
  { alts, files, newsId },
  options = {},
) => {

  const { transaction } = options;

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("Debe subir al menos una imagen");
  }

  alts = Array.isArray(alts) ? alts : [alts];

  if (files.length !== alts.length) {
    throw new Error("Cada imagen debe contar con texto alternativo");
  }

  const existingNews = await NewsModel.findByPk(newsId, { transaction });

  if (!existingNews) {
    throw new Error("Imagen no puede ser asociada a una noticia inexistente");
  }

  const uploadResults = await Promise.all(
    files.map((file, index) =>
      uploadImageCloud169(
        file.buffer,
        path,
        generateFileName(path) + "_" + index
      )
    )
  );

  const createdGallery = await Promise.all(
    uploadResults.map((file, index) =>
      NewsGalleryModel.create(
        {
          alt: alts[index],
          url: file.url,
          newsId,
        },
        { transaction }
      )
    )
  );

  return createdGallery;
};

export const getGalleryByNewsIdService = async (newsId, options = {}) => {
  const { transaction } = options;
  return await NewsGalleryModel.findAll({
    where: { newsId },
    attributes: ["idNewsGallery", "alt", "url", "newsId"],
    order: [["idNewsGallery", "ASC"]],
    transaction
  });
};

export const getImageByIdGalleryService = async (id) => {
  return await NewsGalleryModel.findByPk(id);
};

export const deleteImagebyIdGalleryService = async (id, options = {}) => {
  const { transaction } = options;
  const existingImage = await NewsGalleryModel.findByPk(id);

  if (!existingImage) {
    return false;
  }

  const publicId = await extractPublicId(existingImage.url);

  try {
    await deleteImageCloud(publicId);

    await existingImage.destroy({transaction});

    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteGallerybyNewsIdService = async (id, transaction = null) => {
  const existingNews = await NewsModel.findByPk(id);

  if (!existingNews) {
    return false;
  }

  const existingImages = await NewsGalleryModel.findAll({
    where: { newsId: id },
    ...(transaction && { transaction }),
  });

  if (!existingImages || existingImages.length === 0) {
    return true;
  }
  try {
    for (const image of existingImages) {
      const publicId = await extractPublicId(image.url);

      if (publicId) {
        await deleteImageCloud(publicId);
      }
      await image.destroy();
    }
    return true;
  } catch (error) {
    throw error;
  }
};
