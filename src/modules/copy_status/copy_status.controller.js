import {
  getAllStatusCopyService,
} from "./copy_status.service.js";
import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { baseStatusCopyDTO } from "./copy_status.dto.js";

export const getAllCopyStatus = async (req, res) => {
  try {
    const allCopiesStatus = await getAllStatusCopyService();

    return res.status(200).json(
      succesGetResponse({
        message: "Estados de las copias obtenidos exitosamente",
        data: allCopiesStatus.map(baseStatusCopyDTO),
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
