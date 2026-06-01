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

export const deleteNewsAndImagesService = async (
  idNews,
  options = {}
) => {

  const transaction = options.transaction;

  try {
    const news = await findNewsByIdRepository(
      idNews,
      { transaction }
    );

    if (!news)
      throw notFoundError("Noticia no encontrada");

    const gallery =
      await findNewsGalleryByNewsRepository(
        idNews,
        { transaction }
      );

    const publicIds = gallery
      .map(img => extractPublicId(img.url))
      .filter(Boolean);

    await Promise.all(
      publicIds.map(id =>
        deleteImageCloud(id)
      )
    );

    await deleteGalleryByNewsIdRepository(
      idNews,
      { transaction }
    );

    await deleteNewsRepository(
      idNews,
      { transaction }
    );

    return true;

  } catch (error) {
    console.error("ERROR DELETE NEWS:", error);
    throw error;
  }
};