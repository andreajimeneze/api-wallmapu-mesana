import { uploadImageCloud710 } from "../../services/images/cloudinary.service.js";
import { generateFileName } from "../../services/images/generateFileName.js";

const path = "edition";

export const createCoverImageService = async (file) => {
  const url = generateFileName(path);
  const coverImage = await uploadImageCloud710(file.buffer, path, url);

  return coverImage;
};

