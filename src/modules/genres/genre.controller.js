import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { baseGenreDTO } from "./genre.dto.js";
import { getAllGenresService, getGenreByIdService } from "./genre.service.js";

export const getAllGenres = async (req, res) => {
  try {
    const allGenres = await getAllGenresService();
    if (!allGenres || allGenres.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "No existen géneros cargados actualmente" }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        resource: "Géneros",
        data: allGenres.map(baseGenreDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener los géneros",
      }),
    );
  }
};

export const getGenreById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedGenre = await getGenreByIdService(id);

    if (!searchedGenre) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "Género no encontrado" }),
        );
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          resource: "Género",
          data: baseGenreDTO(searchedGenre),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener el género",
        }),
      );
  }
};
