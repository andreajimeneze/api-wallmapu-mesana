import {
  successCreateResponse,
  succesGetResponse,
  successUpdateResponse,
  successDeleteResponse,
  internalServerResponse,
  notFoundResponse,
  badRequestResponse,
  conflictResponse,
} from "../../core/responses/apiResponse.js";
import { createNewsDTO, newsResponseDTO, updateNewsDTO } from "./news.dto.js";
import {
  getNewsPaginationAndSearchService,
  createNewsService,
  getNewsByIdService,
  updateNewsService,
} from "./news.service.js";
import { createNewsWithImagesService, updateNewsWithImagesService } from "./usecases/createNewsWithImages.usecase.js";
import { deleteNewsAndImagesService } from "./usecases/deleteNewsAndImages.usecase.js";

export const getNewsPaginationAndSearch = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let items = parseInt(req.query.items ?? 10);

    if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }

    const result = await getNewsPaginationAndSearchService({
      page,
      limit: items,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Noticias obtenidas exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obtener las noticias" }),
      );
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { idNews } = req.params;
    const newsSelected = await getNewsByIdService(idNews);

    res.status(200).json(
      succesGetResponse({
        message: "Noticia obtenida exitosamente",
        data: newsResponseDTO(newsSelected),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404)
      return res.status(404).json(
        notFoundResponse({
          message: error.message,
        }),
      );
    return res
      .status(500)
      .json(internalServerResponse({ message: error.message }));
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, subtitle, body } = req.body;
  
    const newsDto = createNewsDTO({
      title,
      subtitle,
      body,
    });

    const createdNews = await createNewsService(newsDto);

    res.status(201).json(
      successCreateResponse({
        message: "Noticia creada exitosamente",
        data: newsResponseDTO(createdNews),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 409)
      return res.status(409).json(
        conflictResponse({
          message: error.message,
        }),
      )
      res.status(500).json(
        internalServerResponse({
          message: error.message || "Error al crear la noticia",
        }),
      );
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, body } = req.body;
    
    const updateDto = updateNewsDTO({
      title,
      subtitle,
      body,
    });

    const updatedNews = await updateNewsService(id, updateDto);

    res.status(202).json(
      successUpdateResponse({
        message: "Noticia actualizada correctamente",
        data: newsResponseDTO(updatedNews),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404)
      return res.status(404).json(
        notFoundResponse({
          message: error.message,
        }),
      );
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar la noticia",
      }),
    );
  }
};


export const updateNewsWithImage = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, subtitle, body } = req.body;

    let { alts } = req.body;

    if (alts && !Array.isArray(alts)) {
      alts = [alts];
    }

    const updateDto = updateNewsDTO({
      title,
      subtitle,
      body,
    });

    const updatedNews =
      await updateNewsWithImagesService({
        id,
        newsData: updateDto,
        alts,
        files: req.files
      });

    return res.status(202).json(
      successUpdateResponse({
        message: "Noticia actualizada correctamente",
        data: newsResponseDTO(updatedNews),
      })
    );

  } catch (error) {

    console.error(error);

    if (error.status === 404) {
      return res.status(404).json(
        notFoundResponse({
          message: error.message,
        })
      );
    }

    if (error.status === 400) {
      return res.status(400).json(
        badRequestResponse({
          message: error.message,
        })
      );
    }

    return res.status(500).json(
      internalServerResponse({
        message: error.message,
      })
    );
  }
};
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const newsDeleted = await deleteNewsAndImagesService(id);
   
    res.status(202).json(
      successDeleteResponse({
        message: "Noticia eliminada correctamente",
        data: newsDeleted,
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404)
      return res.status(404).json(
        notFoundResponse({
          message: error.message,
        }),
      );
      return res.status(500).json(
        internalServerResponse({
          message:
            "Error al eliminar la noticia",
        }),
      );
  }
};

export const createNewsWithImages = async (req, res) => {
  const { title, subtitle, body } = req.body;
  const files = req.files;
  let { alts } = req.body;

  if (alts && !Array.isArray(alts)) {
    alts = [alts];
  }
  try {
    const newsWithImages = await createNewsWithImagesService({
      title,
      subtitle,
      body,
      alts,
      files
    });

    return res.status(201).json(
      successCreateResponse({
        message: "Noticia con imagen creada exitosamente",
        data: newsResponseDTO(newsWithImages)
      }),
    );
  } catch (error) {
console.error(error);
  if (error.status === 404)
      return res.status(404).json(
        notFoundResponse({
          message: error.message,
        }),
      );
      if (error.status === 409)
      return res.status(409).json(
        conflictResponse({
          message: error.message,
        }),
      )
    return res.status(500).json({
      message: error.message
    });
  }
};
