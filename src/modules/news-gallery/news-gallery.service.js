import {
  uploadImageCloud,
  deleteImageCloud,
  extractPublicId,
} from "../../services/images/cloudinary.service.js";
import {
  NewsGalleryModel,
  NewsModel,
  sequelize,
} from "../../config/dbSequelize.js";

const PATH = "news";

export const createGalleryNewsService = async ({
  id,
  alt = [],
  images = [],
}) => {
  const transaction = await sequelize.transaction();
  const uploadedImages = [];

  try {
    const existingNews = await NewsModel.findByPk(id);

    if (!existingNews) {
      throw new Error("Imagen no puede ser asociada a una noticia inexistente");
    }

    if (!images || images.length === 0) {
      throw new Error("No se enviaron imágenes");
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const result = await uploadImageCloud(image.buffer, PATH);

      console.log("resultado cloud", result);

      const createdGallery = await NewsGalleryModel.create(
        {
          alt: alt[i] || null,
          url: result.url,
          newsId: id,
        },
        { transaction },
      );

      uploadedImages.push(createdGallery);
    }

    await transaction.commit();

    return uploadedImages;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
