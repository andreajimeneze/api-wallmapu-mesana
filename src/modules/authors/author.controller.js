import {
  conflictResponse,
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { authorResponseDTO, updateAuthorDTO } from "./author.dto.js";
import {
  createAuthorService,
  deleteAuthorService,
  getAllAuthorsPaginationService,
  getAllAuthorsService,
  getAuthorByIdService,
  updateAuthorService
} from "./author.service.js";

export const getAllAuthorsPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let limit = parseInt(req.query.limit ?? 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }

    const result = await getAllAuthorsPaginationService({
      page,
      limit,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Autores obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los autores' }));
  }
};
export const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await getAllAuthorsService();

    return res.status(200).json(
      succesGetResponse({
        message: "Autores cargados exitosamente",
        data: allAuthors.map(authorResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al intentar cargar autores" }),
      );
  }
};
export const getAuthorById = async (req, res) => {
  const idAuthor = req.params.id;

  try {
    const author = await getAuthorByIdService(idAuthor);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Autor obtenido exitosamente",
          data: authorResponseDTO(author),
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
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener al autor",
        }),
      );
  }
};
export const createAuthor = async (req, res) => {
  const { name } = req.body;

  try {
    const createdAuthor = await createAuthorService(name);

    res.status(201).json(
      successCreateResponse({
        message: "Autor creado exitosamente",
        data: authorResponseDTO(createdAuthor),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
            message: error.message,
          }),
        );
    }
    res.status(500).json(internalServerResponse({
      message: "Error al crear al autor",
    }),
    );
  }
}
export const updateAuthor = async (req, res) => {
  const id = req.params.id;

  const authorDto = updateAuthorDTO(req.body);
  try {
    const updatedAuthor = await updateAuthorService(id, authorDto);

    res.status(202).json(
      successUpdateResponse({
        message: "Autor actaulizado exitosamente",
        data: authorResponseDTO(updatedAuthor),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
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
    res.status(500).json(internalServerResponse({
      message: "Error al actualizar al autor",
    }),
    );
  }
}


export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAuthor = await deleteAuthorService(id);

    return res
      .status(202)
      .json(
        succesGetResponse({
          message: "Autor eliminado exitosamente",
          data: deletedAuthor,
        }),
      );
  } catch (error) {
    console.error(error);
    if (error.status === 409) {
      return res
        .status(409)
        .json(
          conflictResponse({
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
    res.status(500).json(internalServerResponse({
      message: "Error al actualizar al autor",
    }),
    );
  }
};


