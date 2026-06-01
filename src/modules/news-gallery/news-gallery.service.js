import {
  deleteImageCloud,
  extractPublicId,
  uploadImageCloud169,
} from "../../core/lib/cloudinary.service.js";

import { sequelize } from "../../config/dbSequelize.js";

import { generateFileName } from "../../core/helpers/files/generateFileName.js";
import { deleteNewsRepository, findNewsByIdRepository } from "../news/news.repository.js";
import {
  badRequestError,
  conflictError,
  notFoundError
} from "../../core/helpers/errors/httpErrors.js";

import {
  createGalleryRepository,
  deleteGalleryByIdRepository,
  deleteGalleryByNewsIdRepository,
  findImageByIdGalleryRepository,
  findNewsGalleryByNewsRepository,
} from "./news-gallery.repository.js";

const path = "news";

export const getAllGalleryByNewsService = async(idNews) => {
  return findNewsGalleryByNewsRepository(idNews);
};

export const getImageByIdGalleryService = async(id) => {
  const image = await findImageByIdGalleryRepository(id);
  if(!image) throw notFoundError();
  return image;
}
export const createGalleryByNewsIdService = async (
  { alts = [], files = [], newsId },
  options = {}
) => {

  const transaction = await options.transaction;      

    if (!files || files.length === 0) throw badRequestError("Debe subir al menos una imagen");
    if (files.length !== alts.length) throw badRequestError("Cada imagen debe contar con texto alternativo");        
    if (!files || files.length < 1 || files.length > 3) throw badRequestError("Debe subir entre 1 y 3 imágenes");
      
    const news = await findNewsByIdRepository(newsId, { transaction });

    if (!news) throw notFoundError("Noticia no existe");
    
    const uploadData = await Promise.all(
      files.map((file, index) =>
        uploadImageCloud169(
          file.buffer,
          path,
          generateFileName(path) + "_" + index
        )
      )
    );

    const createdGallery = await Promise.all(
      uploadData.map((file, index) =>
        createGalleryRepository(
          {
            alt: alts[index],
            url: file.url,
            newsId,
          },
          { transaction }
        )
      )
    );

    console.log('galería news: ', createdGallery);
    return createdGallery;
};
export const deleteImagebyIdGalleryService = async (id, options = {}) => {

  const transaction = await sequelize.transaction();

  try {
    const existingImage = await findImageByIdGalleryRepository(id, { transaction });
    if (!existingImage) throw notFoundError();

    const publicId = extractPublicId(existingImage.url);

    await deleteImageCloud(publicId);

    await deleteGalleryByIdRepository(id, { transaction });

    await transaction.commit();
    return true;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const deleteGalleryByNewsService = async (idNews, options = {}) => {
  const transaction = await sequelize.transaction();
  try {
    const news = await findNewsByIdRepository(idNews, {transaction});
    if (!news) throw notFoundError();

    const gallery = await findNewsGalleryByNewsRepository(idNews, {transaction});

    const publicIds = (gallery || [])
      .map((image) => extractPublicId(image.url))
      .filter(Boolean)
  
      await Promise.all(
        publicIds.map((publicId) => deleteImageCloud(publicId))
      )

      await deleteGalleryByNewsIdRepository(idNews, {transaction});

      await transaction.commit();
      return true;
  } catch(error) {
    await transaction.rollback();
    throw error;
  }
}