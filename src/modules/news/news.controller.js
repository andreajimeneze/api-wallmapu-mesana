import {
  successCreateResponse,
  succesGetResponse,
  successUpdateResponse,
  successDeleteResponse,
  internalServerResponse,
  notFoundResponse,
  badRequestResponse,
  conflictResponse,
} from "../../shared/apiResponse.js";
import { createNewsDTO, newsResponseDTO, updateNewsDTO } from "./news.dto.js";
import {
  getNewsPaginationAndSearchService,
  createNewsService,
  getNewsByIdService,
  updateNewsService,
  deleteNewsService,
} from "./news.service.js";

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

    return res.status(200).json(succesGetResponse({
      message: "Noticias obtenidas exitosamente",
      result: result.result,
    }));
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obtener las noticias" }),
      );
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { id_news } = req.params;
    const newsSelected = await getNewsByIdService(id_news);

    res.status(200).json(
      succesGetResponse({
        message: "Noticia obtenida exitosamente",
        result: newsResponseDTO(newsSelected),
      }),
    );
  } catch (error) {
    if (error.code === "NOT_FOUND")
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

    const dto = createNewsDTO({
      title,
      subtitle,
      body,
    });

    const createdNews = await createNewsService(dto);

    res.status(201).json(
      successCreateResponse({
        message: "Noticia creada exitosamente",
        result: createNewsDTO(createdNews),
      }),
    );
  } catch (error) {
    if (error.code === "CONFLICT") {
      res.status(409).json(
        conflictResponse({
          message: error.message || "Título de la noticia ya existe",
        }),
      );
    } else {
      res.status(500).json(
        internalServerResponse({
          message: error.message || "Error al crear la noticia",
        }),
      );
    }
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

    if (!updatedNews) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res.status(202).json(
      successUpdateResponse({
        message: "Noticia editada correctamente",
        result: updateNewsDTO(updatedNews),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar la noticia",
      }),
    );
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const newsDeleted = await deleteNewsService(id);

    if (!newsDeleted) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res
      .status(202)
      .json(successDeleteResponse({
        message: "Noticia eliminada correctamente",
        result: newsDeleted,
      }));
  } catch (error) {
    
    if (error.parent?.code === "23503") { // código de error constraint
      return res
        .status(409)
        .json(
          conflictResponse({ 
             message: "No se puede eliminar una noticia porque existen registros asociados"
          }),
        );
    }
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al eliminar la noticia" }),
      );
  }
};
