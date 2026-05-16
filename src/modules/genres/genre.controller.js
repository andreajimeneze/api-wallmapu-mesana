import {
  conflictResponse,
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successDeleteResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { baseGenreDTO, createGenreDTO, updateGenreDTO } from "./genre.dto.js";
import { createGenreService, deleteGenreService, getAllGenresPaginationService, getAllGenresService, getGenreByIdService, updateGenreService } from "./genre.service.js";

export const getAllGenresPagination = async (req, res) => {
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

    const result = await getAllGenresPaginationService
    ({
      page,
      limit,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Géneros obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error('ERROR GENRE CONTROLLER', error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los géneros' }));
  }
};
export const getAllGenres = async (req, res) => {
  try {
    const allGenres = await getAllGenresService();

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

    return res
      .status(200)
      .json(
        succesGetResponse({
          resource: "Género",
          data: baseGenreDTO(searchedGenre),
        }),
      );
  } catch (error) {
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

export const createGenre = async (req, res) => {
  const name = req.body.name;

  try {
    const createdGenre = await createGenreService(name);
    return res
      .status(201)
      .json(
        successCreateResponse({
          resource: "Género",
          data: baseGenreDTO(createdGenre),
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
          message: "Error al intentar obtener el género",
        }),
      );
  }
};
export const updateGenre = async (req, res) => {
  const  idGenre  = req.params.id;
  const genreDto = updateGenreDTO(req.body);

  try {

    const updatedGenre = await updateGenreService(idGenre, genreDto);
    return res
      .status(200)
      .json(
        successUpdateResponse({
          resource: "Género",
          data: baseGenreDTO(updatedGenre),
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
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener al autor",
        }),
      );
  }
};

export const deleteGenre = async (req, res) => {
  const idGenre  = req.params.id;
  try {

    const deletedGenre = await deleteGenreService(idGenre);
    return res
      .status(200)
      .json(
        successDeleteResponse({
          resource: "Género",
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
     if (error.status === 500) {
      return res
        .status(500)
        .json(
          internalServerResponse({
            message: error.message,
          }),
        );
    }
  }
};


