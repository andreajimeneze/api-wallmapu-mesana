import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { adminResponseDTO, stateAdminResponseDTO } from "./stat.dto.js";
import { getAllAdminService, getAllStatesAdminService } from "./stat.service.js";

export const getAllStatAdmin = async (req, res) => {
  try {
    const allStats = await getAllStatesAdminService();

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Estados de administración cargados exitosamente",
          data: stateAdminResponseDTO(allStats),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(internalServerResponse({ message: "Error al cargar estados" }));
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const allAdmin = await getAllAdminService();

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Estados de administración cargados exitosamente",
          data: adminResponseDTO(allAdmin),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(internalServerResponse({ message: "Error al cargar estados" }));
  }
};
