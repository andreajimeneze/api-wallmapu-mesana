import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { adminResponseDTO, stateAdminResponseDTO, userStatesDTO } from "./stat.dto.js";
import { getAllAdminService, getAllStatesAdminService, getUserStatesService } from "./stat.service.js";

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


export const getAllUserState = async (req, res) => {
  try {
    const userId = req.user.sub;

    const userStates = await getUserStatesService(userId);

    return res
      .status(200)
      .json(
        succesGetResponse({
          message: "Estados de usuario cargados exitosamente",
          data: userStatesDTO(userStates),
        }),
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(internalServerResponse({ message: "Error al cargar estados" }));
  }
};