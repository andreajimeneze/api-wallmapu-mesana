import {
  successCreateResponse,
  succesGetResponse,
  internalServerResponse,
  notFoundResponse,
  successDeleteResponse,
  badRequestResponse,
} from "../../shared/apiResponse.js";

import {
  newsGalleryResponseDTO,
} from "./news-gallery.dto.js";
import {
  createGalleryByNewsIdService,
  getGalleryByNewsIdService,
  getImageByIdGalleryService,
  deleteImagebyIdGalleryService,
  deleteGallerybyNewsIdService,
} from "./news-gallery.service.js";

export const getGalleryByNewsId = async (req, res) => {
  try {
    const { newsId } = req.params;
    const images = await getGalleryByNewsIdService(newsId);

    if (images.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: `No existen imágenes en la galería asociadas a la noticia ${newsId}`,
          }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Imagenes obtenidas exitosamente",
        result: images.map(newsGalleryResponseDTO),
      }),
    );
  } catch (error) {
    res.status(500).json(
      internalServerResponse({
        message: "Error al obtener las imágenes de la galería",
      }),
    );
  }
};

export const getImageByIdGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageByIdGalleryService(id);

    if (!image) {
      return res
        .status(404)
        .json(notFoundResponse({ message: `No existe la imagen ${id}` }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Imagen obtenida exitosamente",
        result: image,
      }),
    );
  } catch (error) {
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
    if (!id || isNaN(Number(id))) {
      return res.status(400).json(
        badRequestResponse({
          message: "Id de noticia inválido",
        }),
      );
    }

    if (!files || files.length < 1 || files.length > 3) {
      return res.status(400).json(
        badRequestResponse({
          message: "Debe subir entre 1 y 3 imágenes",
        }),
      );
    }


    if (!Array.isArray(alts)) alts = [alts];
    
    if (alts.length !== files.length) {
      return res.status(400).json(
        badRequestResponse({
          message:
            "La cantidad de textos altsernativos de imágenes debe coincidir con la cantidad de imágenes",
        }),
      );
    }
    
    const gallery = await createGalleryByNewsIdService( {
      alts,
      files,
      newsId: Number(id)
    });
                
    res.status(201).json(
      successCreateResponse({
        message: "Imagen de galería creada exitosamente",
        result: gallery.map(newsGalleryResponseDTO)
      }),
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json(
      internalServerResponse({
        message: error.message,
      }),
    );
  }
};

export const deleteImageByIdGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedImage = await deleteImagebyIdGalleryService(id);

    if (!deletedImage) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Imagen no existe" }));
    }

    return res
      .status(202)
      .json(
        successDeleteResponse({ message: "Imagen eliminada correctamente" }),
      );
  } catch (error) {
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
  const { id } = req.params;

  try {
    const deletedImages = await deleteGallerybyNewsIdService(id);
    console.log("imagenes borradas", deletedImages);

    if (!deletedImages) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Imagen no existe" }));
    }

    return res
      .status(202)
      .json(
        successDeleteResponse({ message: `Galería de la noticia ${id} eliminada correctamente` }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar eliminar la imagen",
        }),
      );
  }
};
