import {
  deleteImageCloud,
  extractPublicId,
  uploadImageCloud710,
} from "../../core/lib/cloudinary.service.js";
import { generateFileName } from "../../core/helpers/generateFileName.js";
import { EditionModel } from "../../config/dbSequelize.js";

const path = "edition";

export const createCoverImageService = async (file) => {
  const filename = generateFileName(path);
  const { url, public_id } = await uploadImageCloud710(file.buffer, path, filename);

  return url;
};

export const deleteCoverImageService = async (id) => {
  const selectedEdition = await EditionModel.findByPk(id);

  if (!selectedEdition) {
    const error = new Error("Edición no encontrada");
    error.status = 404;
    throw error;
  }

  if (selectedEdition.coverImage) {
    const publicId = extractPublicId(selectedEdition.coverImage);

    if (publicId) {
      try {
        await deleteImageCloud(publicId);
      } catch (e) {
        console.log("Imagen ya eliminada o error controlado");
      }
    }
  }

 
  await selectedEdition.update({ coverImage: null });

  return true; 
};