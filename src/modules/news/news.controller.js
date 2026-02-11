import {
  successCreateResponse,
  successGetResponse,
  successUpdateResponse,
  successDeleteResponse,
  internalServerResponse,
  notFoundResponse,
} from "../../shared/apiResponse.js";
import { createNewsDTO, newsResponseDTO } from "./news.dto.js";
import {
  getNewsPaginationAndSearchService,
  createNewsService,
  getNewsByIdService,
  updateNewsService,
  deleteNewsService,
} from "./news.service.js";

export const getNewsPaginationAndSearch = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? '1', 10);
    let items = parseInt(req.query.items ?? '1', 10);
    const result = await getNewsPaginationAndSearchService({
      page,
      limit: items,
      search: req.query.search ?? '',
    });

    return res.status(200).json(
      successGetResponse({
        message: "Noticias obtenidas exitosamente",
        result: result.result,
      }),
    );
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
      successGetResponse({
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
    const dto = createNewsDTO(req.body);
    const createdNews = await createNewsService(dto);

    res.status(201).json(
      successCreateResponse({
        result: newsResponseDTO(createdNews),
        message: "Noticia creada exitosamente",
      }),
    );
  } catch (error) {
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
    const dto = createNewsDTO(req.body);
    const updatedNews = await updateNewsService(id, dto);

    if (!updatedNews) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res.status(200).json(
      successUpdateResponse({
        message: "Noticia editada correctamente",
        result: newsResponseDTO(updatedNews),
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
    const newsSelected = await deleteNewsService(id);

    if (!newsSelected) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res
      .status(200)
      .json(
        successDeleteResponse({ message: "Noticia eliminada correctamente" }),
      );
  } catch (error) {
    res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al eliminar la noticia" }),
      );
  }
};
