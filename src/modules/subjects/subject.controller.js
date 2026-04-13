import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { subjectResponseDTO } from "./subject.dto.js";
import {
  getAllSubjectsService,
  getSubjectByIdService,
} from "./subject.service.js";

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await getAllSubjectsService();

    if (!subjects || subjects.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "No existen descriptores cargados" }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Descriptores obtenidos existosamente",
        result: subjects.map(subjectResponseDTO),
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

    if (!searchedSubject) {
      return res
        .status(400)
        .json(notFoundResponse({ message: "Descriptor no encontrado" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Descriptor obtenido con éxito",
          result: subjectResponseDTO(searchedSubject),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener el descriptor",
        }),
      );
  }
};
