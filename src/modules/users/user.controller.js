import {
  createUserService,
  getUserByIdService,
  getUsersPaginationSearchService,
  updateUserService,
} from "./user.service.js";
import {
  succesGetResponse,
  badRequestResponse,
  internalServerResponse,
  notFoundResponse,
} from "../../shared/apiResponse.js";
import { userResponseDTO } from "./user.dto.js";

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
        result: result.result,
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

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userSelected = await getUserByIdService(id);

    if (!userSelected) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe usuario" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario encontrado con éxito",
        result: userResponseDTO(userSelected),
      }),
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar obtener al usuario",
      }),
    );
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, userlastname, rut, address, phoneNumber } = req.body;
  const { communeId, userStatusId, userRoleId } = req.body;

  try {
    const userSelected = await getUserByIdService(id);

    if (!userSelected) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe usuario" }));
    }

    const updatedUser = await updateUserService(id, {
      username: username ?? userSelected.username,
      userlastname: userlastname ?? userSelected.userlastname,
      rut: rut ?? userSelected.rut,
      address: address ?? userSelected.address,
      phoneNumber: phoneNumber ?? userSelected.phoneNumber,
      communeId: communeId ?? userSelected.communeId,
      userStatusId: userStatusId ?? userSelected.userStatusId,
      userRoleId: userRoleId ?? userSelected.userRoleId,
    });

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario editado exitosamente",
        result: userResponseDTO(updatedUser),
      }),
    );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar editar al usuario",
      }),
    );
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  const data = { name, email };
  try {
    const createdUser = await createUserService(data);

    return res
      .status(201)
      .json(
        succesGetResponse({
          message: "Usuario creado exitosamente",
          result: createdUser,
        }),
      );
  } catch (error) {
    return res.status(500).json(
      internalServerResponse({
        message: "Error al intentar crear al usuario",
      }),
    );
  }
};
