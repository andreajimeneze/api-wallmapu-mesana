import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { authorResponseDTO } from "./author.dto.js";
import {
  createAuthorService,
  getAllAuthorsService,
  getAuthorByIdService
} from "./author.service.js";

export const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await getAllAuthorsService();
    
    if (!allAuthors || allAuthors.length === 0) {
      return res
        .status(200)
        .json(
          succesGetResponse({ message: "No hay autores cargados actualmente" }),
        );
    }
    
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
  const { id } = req.params;

  try {
    const author = getAuthorByIdService(id);

    if (!author) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Autor no existe" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Autor obtenido exitosamente",
          data: authorResponseDTO(author),
        }),
      );
  } catch (error) {
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
            message: "Author creado exitosamente",
            data: authorResponseDTO(createdAuthor),
          }),
        );
      } catch (error) {
        console.error(error);
        if (error.code === "CONFLICT") {
          res.status(409).json(
            conflictResponse({
              message: error.message || "Nombre del autor ya existe",
            }),
          );
        } else {
          res.status(error.status || 500).json(error.message ||
            internalServerResponse({
              message: error.message || "Error al crear al autor",
            }),
          );
        }
      }
}
