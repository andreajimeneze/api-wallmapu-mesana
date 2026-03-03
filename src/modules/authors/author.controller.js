import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { authorResponseDTO } from "./author.dto.js";
import { getAllAuthorsService } from "./author.service.js";

export const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await getAllAuthorsService();
    console.log("autores en controlador: ", allAuthors);
    if (!allAuthors || allAuthors.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "No hay autores cargados actualmente" }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Autores cargados exitosamente",
        result: allAuthors.map(authorResponseDTO),
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
