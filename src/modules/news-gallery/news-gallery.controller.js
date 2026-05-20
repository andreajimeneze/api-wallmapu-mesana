import {
  successCreateResponse,
  succesGetResponse,
  internalServerResponse,
  notFoundResponse,
  successDeleteResponse,
  badRequestResponse,
} from "../../core/responses/apiResponse.js";

import {
  newsGalleryResponseDTO,
} from "./news-gallery.dto.js";
import { createGalleryByNewsIdService, deleteGalleryByNewsService, deleteImagebyIdGalleryService, getAllGalleryByNewsService, getImageByIdGalleryService } from "./news-gallery.service.js";


export const getGalleryByNewsId = async (req, res) => {
  try {
    const { newsId } = req.params;
    const images = await getAllGalleryByNewsService(newsId);

    return res.status(200).json(
      succesGetResponse({
        message: "Imagenes obtenidas exitosamente",
        data: images.map(newsGalleryResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(
      internalServerResponse({
        message: "Error al obtener las imágenes de la galería",
      }),
    );
  }
};
export const getImageByIdGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await getImageByIdGalleryService(id);

    return res.status(200).json(
      succesGetResponse({
        message: "Imagen obtenida exitosamente",
        data: image,
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(notFoundResponse({ message: error.message }));
    }
    res.status(500).json(
      internalServerResponse({
        message: "Error al obtener la imagen de la galería",
      }),
    );
  }
};
export const createGalleryByNewsId = async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  let { alts } = req.body;

  try {
    const gallery = await createGalleryByNewsIdService({
      alts,
      files,
      newsId: Number(id)
    });

    res.status(201).json(
      successCreateResponse({
        message: "Imagen de galería creada exitosamente",
        data: gallery.map(newsGalleryResponseDTO)
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 400) {
      return res
        .status(400)
        .json(badRequestResponse({ message: error.message }));
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(notFoundResponse({ message: error.message }));
    }
    return res.status(500).json(
      internalServerResponse({
        message: error.message,
      }),
    );
  }
};

export const deleteImageByIdGallery = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedImage = await deleteImagebyIdGalleryService(id);

    return res
      .status(202)
      .json(
        successDeleteResponse({ message: "Imagen eliminada correctamente" }),
      );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(notFoundResponse({ message: error.message }));
    }
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar eliminar la imagen",
        }),
      );
  }
};

export const deleteGalleryByNewsId = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedImages = await deleteGalleryByNewsService(id);

    return res
      .status(202)
      .json(
        successDeleteResponse({ message: `Galería de la noticia ${id} eliminada correctamente` }),
      );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(notFoundResponse({ message: error.message }));
    }
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar eliminar la imagen",
        }),
      );
  }
};
