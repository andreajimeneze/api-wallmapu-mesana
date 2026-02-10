import {
  successCreateResponse,
  successGetResponse,
  internalServerResponse,
  notFoundResponse,
} from "../../shared/apiResponse.js";

import {
  newsGalleryResponseDTO
} from "./news-gallery.dto.js";
import {
  createGalleryNewsService,
  getGalleryByNewsService,
} from "./news-gallery.service.js";

export const getGalleryByNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const images = await getGalleryByNewsService(id_news);

    if (images.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "No existen imágenes en la galería" }),
        );
    }

    return res
      .status(200)
      .json(
        successGetResponse({
          message: "Imagenes obtenidas exitosamente",
          result: images.map(newsGalleryResponseDTO),
        }),
      );
  } catch (error) {
    res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al obtener las imágenes de la galería",
        }),
      );
  }
};

export const createGalleryNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const { alt } = req.body;

    if (!req.file) {
      return res.status(400).json(
        notFoundResponse({
          message: "No se ha proporcionado una imagen para la galería",
        }),
      );
    }

    const createdGallery = await createGalleryNewsService({
      id_news,
      alt,
      file: req.file.buffer,
    });

    res
      .status(201)
      .json(
        successCreateResponse({
          message: "Imagen de galería creada exitosamente",
          result: newsGalleryResponseDTO(createdGallery),
        }),
      );
  } catch (error) {
    console.error(error);

    return res.status(404).json(
      notFoundResponse({
        message: error.message,
      }),
    );
  }
};
