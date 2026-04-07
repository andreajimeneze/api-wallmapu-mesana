import { bookResponseDTO, createBookDTO } from "./book.dto.js";
import {
  getBooksPaginationAndSearchService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "./book.service.js";
import {
  notFoundResponse,
  succesGetResponse,
  internalServerResponse,
  successCreateResponse,
  successUpdateResponse,
  successDeleteResponse,
  conflictResponse,
} from "../../shared/apiResponse.js";

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
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Libros obtenidos exitosamente",
        result: result.result,
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
  const { id } = req.params;
  try {
    const searchedBook = await getBookByIdService(id);

    console.log("book by id en controller para admin: ", bookResponseDTO(searchedBook));
    if (!searchedBook) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Libro no encontrado" }));
    }
    return res.status(200).json(
      succesGetResponse({
        message: "Libro obtenido exitosamente",
        result: bookResponseDTO(searchedBook),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el libro",
      }),
    );
  }
};

export const createBook = async (req, res) => {

  const bookData = req.body;
  console.log("bookData req body en controller: ", bookData);
  const bookDto = createBookDTO(bookData);
console.log("bookDto aplicando createBookDTO en controller: ", bookDto);
  try {
    const book = await createBookService(bookDto);

    return res.status(201).json(
      successCreateResponse({
        message: "Libro creado exitosamente",
        result: bookResponseDTO(book),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al intentar crear el libro"
    });
  }
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, summary } = req.body;
  const genre_id = req.body.genre_id;
  const authors = req.body.authors;
  const subjects = req.body.subjects;

  const genreId = parseInt(genre_id);
  const idBook = parseInt(id);
  const bookData = {
    idBook,
    title,
    summary,
    genreId,
    authors,
    subjects,
  };

  try {
    const updatedBook = await updateBookService(idBook, bookData);

    return res.status(202).json(
      successUpdateResponse({
        message: "Libro modificado exitosamente",
        result: bookResponseDTO(updatedBook),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.message === "No puede dejar un libro sin autores") {
      return res.status(409).json(conflictResponse({ message: error.message }));
    }

    if (error.message === "No puede dejar un libro sin descriptores") {
      return res.status(409).json(conflictResponse({ message: error.message }));
    }
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar modificar el libro",
      }),
    );
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteBookService(id);
    return res
      .status(202)
      .json(successDeleteResponse({ message: "Libro eliminado exitosamente" }));
  } catch (error) {
    if (
      error.message ===
      "El libro tiene autores, descriptores o ediciones asociadas"
    ) {
      return res.status(409).json(conflictResponse({ message: error.message }));
    }

    console.error(error);

    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar eliminar el libro",
      }),
    );
  }
};
