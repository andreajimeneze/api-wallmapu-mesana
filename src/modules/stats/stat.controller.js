import {
  internalServerResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { stateAdminResponseDTO } from "./stat.dto.js";
import { getAllStatesAdminService } from "./stat.service.js";

export const getAllStatAdmin = async (req, res) => {
  try {
    const allStats = await getAllStatesAdminService();

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Estados de administración cargados exitosamente",
          result: stateAdminResponseDTO(allStats),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(internalServerResponse({ message: "Error al cargar estados" }));
  }
};
