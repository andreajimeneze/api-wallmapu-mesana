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
  getAllNewsService,
  createNewsService,
  getOneNewsService,
  updateNewsService,
  deleteNewsService,
} from "./news.service.js";

export const getAllNews = async (req, res) => {
  try {
    const result = await getAllNewsService({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search || null,
    });

    if (result.result.total === 0) {
      return res.status(404).json(notFoundResponse({ message: "No se encontraron noticias", result: result.result}));
    }

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

export const getOneNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const newsSelected = await getOneNewsService(id_news);

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
