import { conflictError } from "../../core/helpers/errors/httpErrors.js";
import {
  conflictResponse,
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { editionResponseDTO, createEditionDTO, baseEditionDTO, editionDetailDTO, editionForBookResponseDTO, editionRequestDTO, updateEditionDTO } from "./edition.dto.js";
import {
  createEditionService,
  deleteEditionWithImageService,
  getAllEditionPaginationService,
  getEditionsByBookIdDetailService,
  getEditionByIdService,
  updateEditionService,
} from "./edition.service.js";

export const getEditionPagination = async (req, res) => {
  try {
    const { page, limit, id_author, id_genre, id_editorial, id_format} = req.query;
    const filter = editionRequestDTO({
      id_author,
      id_genre,
      id_editorial,
      id_format
    })

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o limit debe ser mayor a 0",
        }),
      );
    }

    const result = await getAllEditionPaginationService({
      page,
      limit,
      search: req.query.search ?? "",
      filter
    });

    return res.status(200).json(
      succesGetResponse({
        resource: "Ediciones",
        data: result.data,
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
export const getEditionById = async (req, res) => {
  const { id } = req.params;

  try {
    const edition = await getEditionByIdService(id);

    return res.status(200).json(
      succesGetResponse({
        resource: "Edición",
        data: baseEditionDTO(edition),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
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
    const editionByBook = await getEditionsByBookIdDetailService(idBook);

    return res.status(200).json(
      succesGetResponse({
        resource: "Edición",
        data: editionByBook.map(editionDetailDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener la edición del libro",
      }),
    );
  }
};
export const getEditionByBookIdDetail = async (req, res) => {
  const { idBook } = req.params;

  try {
    const editionByBook = await getEditionsByBookIdDetailService(idBook);

    if (!editionByBook) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe edición" }));
    }

    return res.status(200).json(
      succesGetResponse({
        resource: "Edición",
        data: editionByBook.map(editionForBookResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
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
        data: editionDetailDTO(createdEdition),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 400) {
      return res
        .status(400)
        .json(
          badRequestResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
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

 const editionDTO = updateEditionDTO(editionData);
  try {
    const editedEdition = await updateEditionService(id, editionDTO);

    return res.status(202).json(
      successUpdateResponse({
        message: "Edición modificada con éxito",
        data: editionDetailDTO(editedEdition),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 400) {
      return res
        .status(400)
        .json(
          badRequestResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
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
    const deleted = await deleteEditionWithImageService(id);

    return res
      .status(202)
      .json(successDeleteResponse({ message: "Edición eliminada con éxito", data: deleted }));
  } catch (error) {
    console.error(error);
    if (error.status === 400) {
      return res
        .status(400)
        .json(
          badRequestResponse({
            message: error.message,
          }),
        );
    }

    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }

    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }

    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al eliminar obtener la edición",
        }),
      );
  }
}

