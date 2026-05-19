import { baseBookDTO, bookDetailDTO, bookResponseDTO, createBookDTO, updateBookDTO } from "./book.dto.js";
import {
  getBooksPaginationAndSearchService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService
} from "./book.service.js";
import {
  notFoundResponse,
  succesGetResponse,
  internalServerResponse,
  successCreateResponse,
  successUpdateResponse,
  successDeleteResponse,
  conflictResponse,
} from "../../core/responses/apiResponse.js";

export const getBooksPaginationAndSearch = async (req, res) => {
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

    const result = await getBooksPaginationAndSearchService({
      page,
      limit: items,
      search: req.query.search ?? ""
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Libros obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(internalServerResponse({ message: "Error al obtener los libros" }));
  }
};
export const getBookById = async (req, res) => {
  const idBook = req.params.id;

  try {
    const searchedBook = await getBookByIdService(idBook);

    return res.status(200).json(
      succesGetResponse({
        message: "Libro obtenido exitosamente",
        data: bookDetailDTO(searchedBook),
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
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el libro",
      }),
    );
  }
};
export const createBook = async (req, res) => {
  const bookDto = createBookDTO(req.body);

  try {
    const book = await createBookService(bookDto);

    return res.status(201).json(
      successCreateResponse({
        message: "Libro creado exitosamente",
        data: bookResponseDTO(book),
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
export const updateBook = async (req, res) => {
  const idBook = req.params.id;
  const bookDto = updateBookDTO(req.body);

  try {
    const updatedBook = await updateBookService(idBook, bookDto);

    return res.status(202).json(
      successUpdateResponse({
        message: "Libro modificado exitosamente",
        data: bookResponseDTO(updatedBook),
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
export const deleteBook = async (req, res) => {
  const idBook = req.params.id;

  try {
    await deleteBookService(idBook);
    return res
      .status(202)
      .json(successDeleteResponse({ message: "Libro eliminado exitosamente" }));
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
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar el libro",
      }),
    );
  }
};
