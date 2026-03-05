import {
  getAllStatusCopyService,
  getStatusCopyByIdService,
} from "./copy_status.service.js";
import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { statusCopyResponseDTO } from "./copy_status.dto.js";

export const getAllCopyStatus = async (req, res) => {
  try {
    const allCopiesStatus = await getAllStatusCopyService();
    if (!allCopiesStatus || allCopiesStatus.length === 0) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "Estado de la copia no encontrado" }),
        );
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Estados de las copias obtenidos exitosamente",
        result: allCopiesStatus.map(statusCopyResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el estado de la copia",
      }),
    );
  }
};

export const getCopyStatusById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedCopyStatus = await getStatusCopyByIdService(id);

    if (!searchedCopyStatus) {
      return res
        .status(404)
        .json(
          notFoundResponse({ message: "Estado de la copia no encontrado" }),
        );
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Estado de la copia obtenido exitosamente",
          result: statusCopyResponseDTO(searchedCopyStatus),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener el estado de la copia",
        }),
      );
  }
};
