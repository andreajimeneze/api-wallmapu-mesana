import { successCreateResponse, successGetResponse, successUpdateResponse, successDeleteResponse, internalServerResponse, notFoundResponse } from "../../shared/apiResponse.js";
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { count, rows} = await getAllNewsService({ limit, offset });

    if (!rows || rows.length === 0) {
      return res.status(404).json(notFoundResponse({ message: "No hay noticias actualmente" }));
    }

    const next = count > page * limit ? `/news?page=${page + 1}&limit=${limit}` : null;
    const prev = page > 1 ? `/news?page=${page - 1}&limit=${limit}` : null;

    return res
      .status(200)
      .json(successGetResponse({ message: "Noticias obtenidas exitosamente", data: { pagination: {total: count, page, limit, next, prev}, rows: rows.map(newsResponseDTO) } }));
  } catch (error) {
     console.error(error); 
    res.status(500).json(internalServerResponse({ error: "Error al obtener las noticias" }));
  }
};

export const getOneNews = async (req, res) => {
  try {
    const { id_news } = req.params;
    const newsSelected = await getOneNewsService(id_news);
    if (!newsSelected) {
      return res.status(404).json(notFoundResponse({ message: "Noticia no encontrada" }));
    }
    res.status(200).json(successGetResponse({message: "Noticia obtenida exitosamente", data: newsResponseDTO(newsSelected)}));
  } catch (error) {
    res.status(500).json(internalServerResponse({ error: "Error al obtener la noticia solicitada" }));
  }
};

export const createNews = async (req, res) => {
  try {
    const dto = createNewsDTO(req.body);
    const createdNews = await createNewsService(dto);

    res.status(201).json(successCreateResponse({
      data: newsResponseDTO(createdNews),
      message: "Noticia creada exitosamente",
    }));
  } catch (error) {
    res.status(500).json(internalServerResponse({ error: error.message }));
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const dto = createNewsDTO(req.body);
    const updatedNews = await updateNewsService(id, dto);

    if (!updatedNews) {
      return res.status(404).json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res.status(200).json(successUpdateResponse({
      message: "Noticia editada correctamente",
      data: newsResponseDTO(updatedNews)
    }));
  } catch (error) {
    return res
      .status(500)
      .json(internalServerResponse({ error: "Error al intentar editar la noticia" }));
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const newsSelected = await deleteNewsService(id);

    if (!newsSelected) {
      return res.status(404).json(notFoundResponse({ message: "Noticia no encontrada" }));
    }

    res.status(200).json(successDeleteResponse({ message: "Noticia eliminada correctamente" }));
  } catch (error) {
    res.status(500).json(internalServerResponse({ message: "Error al eliminar la noticia" }));
  }
};
