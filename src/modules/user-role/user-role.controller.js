import { getAllUserRolesService } from "./user-role.service.js";
import {
  internalServerResponse,
  succesGetResponse,
} from "../../core/responses/apiResponse.js";
import { responseUserRoleDTO } from "./user-role.dto.js";

export const getUserRoles = async (req, res) => {
  try {
    const userRoles = await getAllUserRolesService();

    return res.status(200).json(
      succesGetResponse({
        message: "Roles obtenidos exitosamente",
        data: userRoles.map(responseUserRoleDTO),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener roles de usuario"
      }),
    );
  }
};

