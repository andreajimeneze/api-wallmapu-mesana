import { getUserRolesService, getUserRoleByIdService } from "./user-role.service.js";
import {
  internalServerResponse,
  notFoundResponse,
  succesGetResponse,
} from "../../shared/apiResponse.js";
import { responseUserRoleDTO } from "./user-role.dto.js";

export const getUserRoles = async (req, res) => {
  try {
    const userRoles = await getUserRolesService();

    if (!userRoles) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe roles cargados" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Roles obtenidos exitosamente",
        result: userRoles.map(responseUserRoleDTO),
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

export const getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const userRoleId = await getUserRoleByIdService(id);

    if (!userRoleId) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe rol solicitado" }));
    }
    return res.status(200).json(
      succesGetResponse({
        message: "Rol obtenido exitosamente",
        result: responseUserRoleDTO(userRoleId),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener el user role",
      }),
    );
  }
};
