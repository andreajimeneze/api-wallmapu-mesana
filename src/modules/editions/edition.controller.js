import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successDeleteResponse,
} from "../../shared/apiResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
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

    console.log('limit', limit);
    console.log('req query', req.query);

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
      id_editorial
    });

    console.log('service response en controller: ', serviceResponse);
    const { result } = serviceResponse;
console.log('ediciones disponibles: ', result);
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
    const searchedEdition = await getEditionByIdService(id);
console.log('edición encontrada edition controller: ', searchedEdition);
    if (!searchedEdition) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Edición no encontrada" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Edición encontrada exitosamente",
        result: editionResponseDTO(searchedEdition),
      }),
    );
  } catch (error) {
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
        message: "Edición encontrada exitosamente",
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
  const dtoEdition = req.body;

  try {
    const createdEdition = await createEditionService(dtoEdition);

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
  const  editionData  = req.body;


  console.log("edición data req body", req.body);

  try {
    const editedEdition = await updateEditionService(id, editionData);

    return res.status(202).json(
      editionResponseDTO({
        message: "Edición modificada con éxito",
        result: editionResponseDTO(editedEdition),
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
  console.log('id edition controller: ', id);

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
