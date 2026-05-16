import {
  badRequestResponse,
  conflictResponse,
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
  successCreateResponse,
  successUpdateResponse,
} from "../../core/responses/apiResponse.js";
import { subjectResponseDTO, updateSubjectDTO } from "./subject.dto.js";
import {
  createSubjectService,
  deleteSubjectService,
  getAllSubjectsPaginationService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
} from "./subject.service.js";

export const getAllSubjectsPagination = async (req, res) => {
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

    const result = await getAllSubjectsPaginationService
      ({
        page,
        limit,
        search: req.query.search ?? "",
      });

    return res.status(200).json(
      succesGetResponse({
        message: "Descriptores obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error('ERROR SUBJECT CONTROLLER', error);
    return res.status(500).json(internalServerResponse({ message: 'Error al intentar obtener los descriptores' }));
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await getAllSubjectsService();

    if (!subjects || subjects.length === 0) {
      return res
        .status(200)
        .json(
          succesGetResponse({ message: "No existen descriptores cargados" }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Descriptores obtenidos existosamente",
        data: subjects.map(subjectResponseDTO),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener los descriptores",
      }),
    );
  }
};

export const getSubjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedSubject = await getSubjectByIdService(id);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Descriptor obtenido con éxito",
          data: subjectResponseDTO(searchedSubject),
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

export const createSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const createdSubject = await createSubjectService(name);

    res.status(201).json(
      successCreateResponse({
        message: "Descriptor creado exitosamente",
        data: subjectResponseDTO(createSubject),
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
export const updateSubject = async (req, res) => {
  const { id } = req.params;

  const subjectDTO = updateSubjectDTO(req.body);

  try {
    const updatedSubject = await updateSubjectService(id, subjectDTO);

    res.status(202).json(
      successUpdateResponse({
        message: "Descriptor actualizado exitosamente",
        data: subjectResponseDTO(updatedSubject),
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

export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubject = await deleteSubjectService(id);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Descriptor eliminado exitosamente",
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
