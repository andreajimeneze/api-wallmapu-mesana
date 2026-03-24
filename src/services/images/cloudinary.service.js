import cloudinary from "../../config/cloudinary.js";

export const uploadImageCloud169 = (buffer, folder, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        format: "webp",
        transformation: [
          {
            width: 1280,
            height: 720,
            crop: "fill",
            gravity: "center",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
};

export const uploadImageCloud710 = (buffer, folder, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        format: "webp",
        transformation: [
          {
            width: 700,
            height: 1000,
            crop: "fill",
            gravity: "center",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
};

export const deleteImageCloud = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok") {
    throw new Error("No se pudo eliminar la imagen en Cludinary");
  }

  return result;
};

export const extractPublicId = (url) => {
  try {
    const afterUpload = url.split("/upload/")[1];

    if (!afterUpload) return null;

    const parts = afterUpload.split("/").slice(1).join("/");
    const publicId = parts.substring(0, parts.lastIndexOf("."));

    return publicId;
  } catch {
    return null;
  }
};
