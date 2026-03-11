import { bookResponseDTO } from "./book.dto.js";
import {
  getBooksPaginationAndSearchService,
  getBookByIdService,
  createBookService,
} from "./book.service.js";
import {
  notFoundResponse,
  succesGetResponse,
  internalServerResponse,
} from "../../shared/apiResponse.js";
import { getAllGenresService } from "../genres/genre.service.js";

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

  try {
    const book = await createBookService(bookData);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Libro creado exitosamente",
          result: bookResponseDTO(book),
        }),
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        internalServerResponse({ message: "Error al intentar crear el libro" }),
      );
  }
};
