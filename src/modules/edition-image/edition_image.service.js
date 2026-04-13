import {
  deleteImageCloud,
  extractPublicId,
  uploadImageCloud710,
} from "../../core/services/cloudinary.service.js";
import { generateFileName } from "../../core/utils/generateFileName.js";
import { EditionModel } from "../../config/dbSequelize.js";

const path = "edition";

export const createCoverImageService = async (file) => {
  const filename = generateFileName(path);
  const {url, public_id} = await uploadImageCloud710(file.buffer, path, filename);

  return url;
};

export const deleteCoverImageService = async (id) => {
  const selectedEdition = await EditionModel.findByPk(id);

  if (!selectedEdition) {
    const error = new Error("Edición no existe");
    error.status = 404;
    throw error;
  }

  if (!selectedEdition.coverImage || selectedEdition.coverImage === null) {
    const error = new Error("La edición no tiene imagen de portada");
    error.status = 404;
    throw error;
  }

  const publicId = extractPublicId(selectedEdition.coverImage);

  if (publicId) {
    await deleteImageCloud(publicId);
  }

  await selectedEdition.update({ coverImage: null });


  return true;
};
