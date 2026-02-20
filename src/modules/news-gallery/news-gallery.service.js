import {
  deleteImageCloud,
  extractPublicId,
  uploadImageCloud,
} from "../../services/images/cloudinary.service.js";
import { NewsGalleryModel, NewsModel } from "../../config/dbSequelize.js";

const path = "news";

export const createGalleryByNewsIdService = async (
  { alts, images, newsId },
  transaction,
) => {

  // Validaciones
  if (!Array.isArray(images)) {
    throw new Error("Formato de imágenes, inválido");
  }
  if (!images || images.length === 0) {
    throw new Error("Debe subir al menos una imagen");
  }

  if (!Array.isArray(alts)) {
    throw new Error("Formato de textos alternativos de imágenes, inválido");
  }

  if (images.length !== alts.length) {
    throw new Error("Cada imagen debe contar con texto alternativo");
  }

  const existingNews = await NewsModel.findByPk(newsId, { transaction });

  if (!existingNews) {
    throw new Error("Imagen no puede ser asociada a una noticia inexistente");
  }

  const uploadResults = await Promise.all(
    images.map((file, index) =>
      uploadImageCloud(
        file.buffer,
        path,
        `${newsId}-'idNews'-${Date.now().toString(36)}_${index}`,
      ),
    ),
  );

  const galleryData = uploadResults.map((result, index) => ({
    alt: alts[index],
    url: result.url,
    newsId,
  }));

  const createdGallery = await NewsGalleryModel.bulkCreate(galleryData, {
    transaction,
  });
  return createdGallery;
};



export const getGalleryByNewsIdService = async (newsId) => {
  return await NewsGalleryModel.findAll({
    where: { newsId },
    attributes: ["idNewsGallery", "alt", "url", "newsId"],
    order: [["idNewsGallery", "ASC"]],
  });
};

export const getImageByIdGalleryService = async (id) => {
  return await NewsGalleryModel.findByPk(id);
};

export const deleteImagebyIdGalleryService = async (id) => {
  const existingImage = await NewsGalleryModel.findByPk(id);

  if (!existingImage) {
    return false;
  }

  const publicId = await extractPublicId(existingImage.url);

  try {
    await deleteImageCloud(publicId);

    await existingImage.destroy();

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

  console.log("imagenes rescatadas", existingImages);
  if (!existingImages || existingImages.length === 0) {
    return true;
  }
  try {
    for (const image of existingImages) {
      const publicId = await extractPublicId(image.url);

      console.log("ids públicos cloudinary", publicId);

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
