import {
  getUserByIdService,
  getUsersPaginationSearchService,
  updateUserService,
} from "./user.service.js";
import {
  succesGetResponse,
  badRequestResponse,
  internalServerResponse,
  notFoundResponse,
  unauthorizedResponse,
} from "../../core/responses/apiResponse.js";
import { updateUserByAdminDTO, updateUserDTO, userResponseDTO } from "./user.dto.js";
import { conflictError, unauthorizedError } from "../../core/helpers/errors/httpErrors.js";

export const getUsersPaginationSearch = async (req, res) => {
  try {
    let page = parseInt(req.query.page ?? 1);
    let items = parseInt(req.query.items ?? 10);

    if (isNaN(page) || page < 1 || isNaN(items) || items < 1) {
      return res.status(400).json(
        badRequestResponse({
          message: "El número de página o items debe ser mayor a 0",
        }),
      );
    }
    const result = await getUsersPaginationSearchService({
      page,
      limit: items,
      search: req.query.search ?? "",
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Usuarios obtenidos exitosamente",
        data: result.data,
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener los usuarios",
      }),
    );
  }
};
export const getUserByIdUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userSelected = await getUserByIdService(id);
    return res.status(200).json(
      succesGetResponse({
        message: "Usuario encontrado con éxito",
        data: userResponseDTO(userSelected),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener al usuario",
      }),
    );
  }
};
export const updateUser = async (req, res) => {
  const targetUser = req.params.id;
  const authenticatedUser = req.user.sub;

  if(targetUser !== authenticatedUser) throw unauthorizedError();
  const data = req.body;
  const userDTO = updateUserDTO(data);

  try {
    const updatedUser = await updateUserService(targetUser, userDTO);

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario editado exitosamente",
        data: userResponseDTO(updatedUser),
      }),
    );
  } catch (error) {
    console.error(error);
    if (error.status === 401) {
      return res
        .status(401)
        .json(
          unauthorizedResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar al usuario",
      }),
    );
  }
};

export const updateUserByAdmin = async (req, res) => {
  const targetUser = req.params.id;
  console.log('body', req.body);
  console.log('params', req.params);
  console.log('user', req.user)
  const data = req.body;
  const userDTO = updateUserByAdminDTO(data);

  try {
    const updatedUser = await updateUserService(targetUser, userDTO);

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario editado exitosamente",
        data: userResponseDTO(updatedUser),
      }),
    );
  } catch (error) {
    console.error(error);
        if (error.status === 401) {
      return res
        .status(401)
        .json(
          unauthorizedResponse({
            message: error.message,
          }),
        );
    }
    if (error.status === 404) {
      return res
        .status(404)
        .json(
          notFoundResponse({
            message: error.message,
          }),
        );
    }
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar al usuario",
      }),
    );
  }
};

