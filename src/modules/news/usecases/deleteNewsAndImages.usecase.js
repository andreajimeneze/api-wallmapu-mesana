import { sequelize } from "../../../config/dbSequelize.js";

import {
  deleteImageCloud,
  extractPublicId,
} from "../../../core/lib/cloudinary.service.js";

import {
  findNewsGalleryByNewsRepository,
  deleteGalleryByNewsIdRepository,
} from "../../news-gallery/news-gallery.repository.js";

import { deleteNewsRepository, findNewsByIdRepository } from "../news.repository.js";

import { notFoundError } from "../../../core/helpers/errors/httpErrors.js";

export const deleteNewsAndImagesService = async (idNews, options = {}) => {

  const transaction = options.transaction;

  try {
    const news = await findNewsByIdRepository(idNews, { transaction });
    if (!news) throw notFoundError();
    
    const gallery = await findNewsGalleryByNewsRepository(idNews, {transaction});

    const publicIds = (gallery || [])
      .map((image) => extractPublicId(image.url))
      .filter(Boolean);

    await Promise.all(
      publicIds.map((publicId) =>
        deleteImageCloud(publicId)
      )
    );

    await deleteGalleryByNewsIdRepository(idNews, { transaction });

    await deleteNewsRepository(idNews, {transaction});

    return true;

  } catch (error) {
    throw error;
  }
};