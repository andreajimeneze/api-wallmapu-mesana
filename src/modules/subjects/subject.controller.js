import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { subjectResponseDTO } from "./subject.dto.js";
import {
  createSubjectService,
  deleteSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
} from "./subject.service.js";

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
          data: subjectResponseDTO(searchedSubject),
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

export const createSubject = async (req, res) => {
   const { name } = req.body;

  try {
    const createdSubject= await createSubjectService(name);

    res.status(201).json(
          successCreateResponse({
            message: "Descriptor creado exitosamente",
            data: subjectResponseDTO(createSubject),
          }),
        );
      } catch (error) {
        console.error(error);
        if (error.code === "CONFLICT") {
          res.status(409).json(
            conflictResponse({
              message: error.message || "Nombre del descriptor ya existe",
            }),
          );
        } else {
          res.status(error.status || 500).json(error.message ||
            internalServerResponse({
              message: error.message || "Error al intentar crear el descriptor",
            }),
          );
        }
      }
}

export const updateSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedSubject = await updateSubjectService(name);

    res.status(202).json(
          successUpdateResponse({
            message: "Descriptor creado exitosamente",
            data: subjectResponseDTO(updatedSubject),
          }),
        );
      } catch (error) {
        console.error(error);
        if (error.code === "CONFLICT") {
          res.status(409).json(
            conflictResponse({
              message: error.message || "Nombre del descriptor ya existe",
            }),
          );
        } else {
          res.status(error.status || 500).json(error.message ||
            internalServerResponse({
              message: error.message || "Error al intentar actualizar el descriptor",
            }),
          );
        }
      }
}

export const deleteSubject= async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubject = await deleteSubjectService(id);

     return res
      .status(202)
      .json(
        succesGetResponse({
          message: "Descriptor eliminado exitosamente",
          data: deletedSubject,
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar eliminar al descriptor",
        }),
      );
  }
};
