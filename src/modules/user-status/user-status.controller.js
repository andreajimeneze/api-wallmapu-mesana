import { getUsersStatusService, getUserStatusByIdService} from "./user-status.service.js";
import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseUserStatusDTO } from "./user-status.dto.js";

export const getUsersStatus = async (req, res) => {
  try {
    const userStatus = await getUsersStatusService();

    if (!userStatus  || userStatus.length === 0) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existen status cargados" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Status obtenidos exitosamente",
        result: userStatus.map(responseUserStatusDTO),
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

export const getUserStatusById = async (req, res) => {
  const {id} = req.params;
  try {
    const userStatus = await getUserStatusByIdService(id);

    if (!userStatus) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe status solicitado" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Status obtenido exitosamente",
        result: responseUserStatusDTO(userStatus)
      }),
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener status de usuario"
        }),
      );
  }
};

