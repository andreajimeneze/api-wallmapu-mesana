import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../shared/apiResponse.js";
import { editionForBookResponseDTO, editionResponseDTO, createEditionDTO } from "./edition.dto.js";
import {
  createEditionService,
  deleteEditionWithImageService,
  getAllEditionPaginationService,
  getAllEditionsService,
  getEditionByBookIdService,
  getEditionByIdService,
  updateEditionService,
} from "./edition.service.js";

export const getEditionPagination = async (req, res) => {
  try {
    let { id_author, id_genre, id_editorial } = req.query;
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o limit debe ser mayor a 0",
        }),
      );
    }

    const serviceResponse = await getAllEditionPaginationService({
      page,
      limit,
      search: req.query.search ?? "",
      id_author,
      id_genre,
      id_editorial,
    });

    const { result } = serviceResponse;

    return res.status(200).json(
      succesGetResponse({
        message: "Ediciones obtenidas exitosamente",
        result: result,
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al obtener las ediciones" }),
      );
  }
};

export const getAllEditions = async (req, res) => {
  try {
    const allEditions = await getAllEditionsService();

    if (!allEditions || allEditions.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Edición no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Lista de ediciones obtenida exitosamente",
        result: allEditions.map(editionResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el listado de ediciones",
      }),
    );
  }
};

export const getEditionById = async (req, res) => {
  const { id } = req.params;

  try {
    const edition = await getEditionByIdService(id);

    if (!edition) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Edición no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Edición encontrada exitosamente",
        result: editionResponseDTO(edition),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la edición",
      }),
    );
  }
};

export const getEditionByBookId = async (req, res) => {
  const { idBook } = req.params;
  const { idEdition } = req.params;
  try {
    const editionByBook = getEditionByBookIdService(idBook, idEdition);

    if (!editionByBook) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe edición" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Edición obtenida exitosamente",
        result: editionResponseDTO(editionByBook),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la edición del libro",
      }),
    );
  }
};

export const createEdition = async (req, res) => {
  const dataEdition = req.body;

  const editionDto = createEditionDTO(dataEdition);
  try {
    const createdEdition = await createEditionService(editionDto);

    return res.status(201).json(
      successCreateResponse({
        message: "Edición creada con éxito",
        result: editionResponseDTO(createdEdition),
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al intentar crear edición" }),
      );
  }
};

export const updateEdition = async (req, res) => {
  const { id } = req.params;
  const editionData = req.body;

  try {
    const editedEdition = await updateEditionService(id, editionData);

    return res.status(202).json(
      successUpdateResponse({
        message: "Edición modificada con éxito",
        result: editedEdition,
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar modificar la edición",
      }),
    );
  }
};

export const deleteWithImageEdition = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteEditionWithImageService(id);

    return res
      .status(202)
      .json(successDeleteResponse({ message: "Edición eliminada con éxito" }));
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al intentar crear el libro",
    });
  }
};
