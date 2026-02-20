import { getUserStatusService } from "./user-status.service.js";
import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { responseUserStatusDTO } from "./user-status.dto.js";

export const getUserStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const userStatus = await getUserStatusService(id);

    if (!userStatus) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "Status no existe" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Status obtenido exitosamente",
        result: responseUserStatusDTO(userStatus),
      }),
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener status de usuario",
        }),
      );
  }
};
