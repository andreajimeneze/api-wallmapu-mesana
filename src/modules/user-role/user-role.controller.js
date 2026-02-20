import { getUserRoleService } from "./user-role.service.js";
import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { responseUserRoleDTO } from "./user-role.dto.js";

export const getUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    const userRole = await getUserRoleService(id);

    if (!userRole) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe rol solicitado" }));
    }

    return res
      .status(200)
      .json(
          succesGetResponse({
          message: "Rol obtenido exitosamente",
          result: responseUserRoleDTO(userRole),
        }),
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        internalServerResponse({
          message: "Error al intentar obtener el user role",
        }),
      );
  }
};
