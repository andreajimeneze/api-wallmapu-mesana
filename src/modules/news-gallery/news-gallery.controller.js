import { errorResponse, successResponse } from "../../shared/apiResponse.js";
import { generateFileName } from "../../shared/images/generateFileName.js";
import { resizeImage } from "../../shared/images/resizeImage.js";
import { saveImageFile } from "../../shared/images/saveImage.js";
import {
  createNewsGalleryDTO,
  newsGalleryResponseDTO,
} from "./news-gallery.dto.js";
import {
  createGalleryNewsService,
  getGalleryByNewsService,
} from "./news-gallery.service.js";

import { presetsImage } from "../../shared/presets/presetsImage.js";

export const getGalleryByNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const gallery = await getGalleryByNewsService(id_news);

    if (gallery.length === 0) {
      return res
        .status(404)
        .json({ message: "No existen imágenes en la galería" });
    }

    return res
      .status(200)
      .json({ gallery: gallery.map(newsGalleryResponseDTO) });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener las imágenes de la galería" });
  }
};

export const createGalleryNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const { alt } = req.body;
   

    if (!req.file) {
      return res.status(400).json(
        errorResponse({
          error: "No se ha proporcionado una imagen para la galería",
        }),
      );
    }

    const imageName = generateFileName("news-image", "webp");

    const resizeBuffer = await resizeImage(req.file.buffer, {
      presetsImage: presetsImage.newsGallery
    });

    await saveImageFile(process.cwd(), "news-gallery", imageName, resizeBuffer);

    const galleryDTO = createNewsGalleryDTO({
      alt,
      img: imageName,
      id_news
    });

    await createGalleryNewsService(galleryDTO);

    res
      .status(201)
      .json(
        successResponse({ message: "Imagen de galería creada exitosamente" }),
      );
  } catch (error) {
    console.error("Error al crear la imagen de la galería:", error);
    res
      .status(500)
      .json(errorResponse({ error: "Error al crear la imagen en la galería" }));
  }
};
