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
} from "../../core/responses/apiResponse.js";
import { updateUserDTO, userResponseDTO } from "./user.dto.js";

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

    if (!userSelected) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe usuario" }));
    }

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario encontrado con éxito",
        data: userResponseDTO(userSelected),
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

export const getUserByIdAdmin = async (req, res) => {
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
        message: "Usuario Admin encontrado con éxito",
        data: userResponseDTO(userSelected),
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
console.log('req.params:', req.params);
console.log('id:', id);

const data = req.body;
console.log('req.body:', req.body);
console.log('data (alias req.body):', data);

const userDTO = updateUserDTO(data);

  try {
    const userSelected = await updateUserService(id, userDTO);

    if (!userSelected) {
      return res
        .status(404)
        .json(notFoundResponse({ message: "No existe usuario" }));
    }

    const dtoData = updateUserDTO(data, userSelected);

    const updatedUser = await updateUserService(id, dtoData);

    return res.status(200).json(
      succesGetResponse({
        message: "Usuario editado exitosamente",
        data: userResponseDTO(updatedUser),
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
          data: createdUser,
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

