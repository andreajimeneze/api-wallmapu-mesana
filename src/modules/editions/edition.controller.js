import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
} from "../../shared/apiResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
import {
  createEditionService,
  getAllEditionPaginationService,
  getAllEditionsService,
  getEditionByBookIdService,
  getEditionByIdService,
  updateEditionService,
} from "./edition.service.js";


export const getEditionPagination = async (req, res) => {
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

    const serviceResponse = await getAllEditionPaginationService({
      page,
      limit: items,
      search: req.query.search ?? "",
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
      .json(internalServerResponse({ message: "Error al obtener las ediciones" }));
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

  try {
    const editionByBook = getEditionByBookIdService(idBook);

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
  const { dtoEdition } = req.body;

  try {
    const createdEdition = await createEditionService(dtoEdition);

    return res.status(201).json(
      successCreateResponse({
        message: "Edición creada con éxito",
        result: editionResponseDTO(createdEdition),
      }),
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al intentar crear edición" }),
      );
  }
};

export const updateEdition = async (req, res) => {
  const { id } = req.params;
  const { dto } = req.body;

  const updateDto = dto;

  try {
    const editedEdition = await updateEditionService(updateDto);

    return res
      .status(202)
      .json(
        editionResponseDTO({
          message: "Edición modificada con éxito",
          result: editionResponseDTO(updateEdition),
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
