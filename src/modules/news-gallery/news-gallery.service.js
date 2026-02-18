import {
  deleteImageCloud,
  extractPublicId,
} from "../../services/images/cloudinary.service.js";
import {
  NewsGalleryModel,
  NewsModel
} from "../../config/dbSequelize.js";


export const createGalleryNewsService = async ({
  alt = null,
  url,
  newsId
}, transaction) => {
  

    const existingNews = await NewsModel.findByPk(newsId, {transaction});

    if (!existingNews) {
      throw new Error("Imagen no puede ser asociada a una noticia inexistente");
    }

    return await NewsGalleryModel.create(
        {
          alt,
          url,
          newsId,
        },
        { transaction }
      )
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

export const deleteGallerybyNewsIdService = async (id) => {
  const existingNews = await NewsModel.findByPk(id);

  if (!existingNews) {
    return false;
  }

  const existingImages = await NewsGalleryModel.findAll({
    where: { newsId: id },
  });

  console.log('imagenes rescatadas', existingImages);
  if (!existingImages || existingImages.length === 0) {
    return true;
  }
try {
  for (const image of existingImages) {
    const publicId = await extractPublicId(image.url);

    console.log('ids públicos cloudinary', publicId);

    if(publicId) {
      await deleteImageCloud(publicId);
    }
 await image.destroy();
  }
    return true;
  } catch (error) {
    throw error;
  }
};
