import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { copyResponseDTO } from "./copy.dto.js";
import { getAllCopiesService, getCopyByIdService } from "./copy.service.js";

export const getAllCopies = async (req, res) => {
  try {
    const allCopies = await getAllCopiesService();

    if (!allCopies || allCopies.length === 0) {
      return res.status(404).json(
        notFoundResponse({
          message: "No existen copias cargadas actualmente",
        }),
      );
    }
    return res.status(200).json(
      succesGetResponse({
        message: "Copias obtenidas exitosamente",
        result: allCopies.map(copyResponseDTO),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener las copias",
      }),
    );
  }
};

export const getCopyById = async (req, res) => {
  const { id } = req.params;

  try {
    const searchedCopy = await getCopyByIdService(id);

    if (!searchedCopy) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Copia no encontrada" }));
    }

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Copia obtenida exitosamente",
          result: copyResponseDTO(searchedCopy),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener la copia",
        }),
      );
  }
};
