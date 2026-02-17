import {
  successCreateResponse,
  succesGetResponse,
  internalServerResponse,
  notFoundResponse,
  successDeleteResponse,
} from "../../shared/apiResponse.js";

import {
  createNewsGalleryDTO,
  newsGalleryResponseDTO
} from "./news-gallery.dto.js";
import {
  createGalleryNewsService,
  getGalleryByNewsIdService,
  getImageByIdGalleryService,
  deleteImagebyIdGalleryService,
  deleteGallerybyNewsIdService
} from "./news-gallery.service.js";

export const getGalleryByNewsId = async (req, res) => {
  try {
    const { news_id } = req.params;
    const images = await getGalleryByNewsIdService(news_id);

    if (images.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: `No existen imágenes en la galería asociadas a la noticia ${news_id}` }),
        );
    }

    return res
      .status(200)
      .json(
    succesGetResponse({
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

export const getImageByIdGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageByIdGalleryService(id);

    if (!image) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: `No existe la imagen ${id}` }),
        );
    }

    return res
      .status(200)
      .json(
    succesGetResponse({
          message: "Imagen obtenida exitosamente",
          result: image
        }),
      );
  } catch (error) {
    res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al obtener la imagen de la galería"
        }),
      );
  }
};

export const createGalleryNews = async (req, res) => {
  const { id } = req.params;
  const images = req.files;
  const alt = req.body.alt || [];

  try {
    if (!images) {
      return res.status(400).json(
        notFoundResponse({
          message: "No se ha proporcionado una imagen para la galería",
        }),
      );
    }

    const dtoGallery = createNewsGalleryDTO({
      alt,
      images,
      newsId: Number(id)
    })
    const createdGallery = await createGalleryNewsService({
      alt: dtoGallery.alt,
      images: dtoGallery.images,
      id: dtoGallery.newsId
    });

    res
      .status(201)
      .json(
        successCreateResponse({
          message: "Imagen de galería creada exitosamente",
          result: createdGallery.map(newsGalleryResponseDTO),
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

export const deleteImageByIdGallery = async (req, res) => {
  const { id } = req.params;

  try {
  const deletedImage = await deleteImagebyIdGalleryService(id);

  if(!deletedImage) {
    return res.status(404).json(notFoundResponse({message: 'Imagen no existe'}));
  }

  return res.status(202).json(successDeleteResponse({message: 'Imagen eliminada correctamente'}));
  } catch(error) {
    return res.status(500).json(internalServerResponse({message: 'Error al intentar eliminar la imagen'}));
  }
};

export const deleteGalleryByNewsId = async (req, res) => {
  const { id } = req.params;

  try {
  const deletedImages = await deleteGallerybyNewsIdService(id);
  console.log('imagenes borradas', deletedImages);

  if(!deletedImages) {
    return res.status(404).json(notFoundResponse({message: 'Imagen no existe'}));
  }

  return res.status(202).json(successDeleteResponse({message: 'Imagen eliminada correctamente'}));
  } catch(error) {
    return res.status(500).json(internalServerResponse({message: 'Error al intentar eliminar la imagen'}));
  }
}
