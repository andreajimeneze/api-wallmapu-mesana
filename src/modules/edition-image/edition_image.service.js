import { deleteImageCloud, extractPublicId, uploadImageCloud710 } from "../../services/images/cloudinary.service.js";
import { generateFileName } from "../../services/images/generateFileName.js";
import { getEditionByIdService } from "../editions/edition.service.js";

const path = "edition";

export const createCoverImageService = async (file) => {
  const url = generateFileName(path);
  const coverImage = await uploadImageCloud710(file.buffer, path, url);

  return coverImage;
};

export const deleteCoverImageService = async (id) => {
  const selectedEdition = await getEditionByIdService(id);

  if(!selectedEdition) {
    const error = new Error('Edición no existe');
    error.status = 404;
    throw error;
  };

  if(!selectedEdition.coverImage || selectedEdition.coverImage === '') {
    const errorImage = new Error('La edición no tiene imagen de portada');
    errorImage.status = 404;
    throw errorImage;
  }

  const publicId = extractPublicId(selectedEdition.coverImage);

  await deleteImageCloud(publicId);

  return true;
}

