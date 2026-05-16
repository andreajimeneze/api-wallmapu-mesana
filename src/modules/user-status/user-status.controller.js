import { getUsersStatusService} from "./user-status.service.js";
import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseUserStatusDTO } from "./user-status.dto.js";

export const getUsersStatus = async (req, res) => {
  try {
    const userStatus = await getUsersStatusService();

    return res.status(200).json(
      succesGetResponse({
        message: "Status obtenidos exitosamente",
        data: userStatus.map(responseUserStatusDTO),
      }),
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener status de usuarios",
        }),
      );
  }
};


