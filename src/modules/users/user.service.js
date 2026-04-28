import { now } from "sequelize/lib/utils";
import {
  CommuneModel,
  UserModel,
  UserRoleModel,
  UserStatusModel,
} from "../../config/dbSequelize.js";
import { paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { userCompleteResponseDTO, userResponseDTO } from "./user.dto.js";
import { isProfileComplete } from '../auth/utils/profileComplete.js';

export const getUsersPaginationSearchService = async ({
  page,
  limit,
  search,
}) => {
  limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
  page = Number.isInteger(Number(page)) ? Number(page) : 1;

  const DEFAULT_LIMIT = 1;
  const MAX_LIMIT = 100;

  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  } else if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  const where = search
    ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { lastname: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ],
      }
    : {};

  const items = await UserModel.count({
    where,
  });

  if (items === 0) {
    return {
      response: "No se encontraron usuarios",
      data: paginationResponseDTO({
        page: 0,
        pages: 0,
        items: 0,
        next: "none",
        prev: "none",
        data: [],
      }),
    };
  }

  const pages = Math.ceil(items / limit);

  const haveSearch = search && search.trim() !== "";

  if (page > pages && page > 0) {
    page = haveSearch ? 1 : pages;
  } else if (page < 1) {
    page = 1;
  }

  const offset = (page - 1) * limit;

  const result = await UserModel.findAll({
    where,
    limit,
    offset,
    distinct: true,
    include: [
      {
        model: CommuneModel,
        as: "commune",
        attributes: ["idCommune", "commune", "provinceId"],
      },
      {
        model: UserStatusModel,
        as: "userStatus",
        attributes: ["idUserStatus", "status"],
      },
      {
        model: UserRoleModel,
        as: "userRole",
        attributes: ["idUserRole", "role"],
      },
    ],
  });
  return {
    response: "Usuarios obtenidos exitosamente",
    data: paginationResponseDTO({
      page,
      pages,
      items,
      next:
        page < pages
          ? `/users?page=${page + 1}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/users?page=${page - 1}&items=${limit}&search=${search}`
          : null,
      data: result.map(userCompleteResponseDTO),
    }),
  };
};

export const getUserByIdService = async (id) => {
  return await UserModel.findByPk(id, {
    include: [
      {
        model: CommuneModel,
        as: "commune",
        attributes: ["idCommune", "commune"],
      },
      {
        model: UserStatusModel,
        as: "userStatus",
        attributes: ["idUserStatus", "status"],
      },
      {
        model: UserRoleModel,
        as: "userRole",
        attributes: ["idUserRole", "role"],
      },
    ],
  });
};

export const getUserByEmailService = async (email) => {
  return await UserModel.findOne({
    where: { email },
    include: [
      {
        model: CommuneModel,
        as: "commune",
        attributes: ["idCommune", "commune", "provinceId"],
      },
      {
        model: UserStatusModel,
        as: "userStatus",
        attributes: ["idUserStatus", "status"],
      },
      {
        model: UserRoleModel,
        as: "userRole",
        attributes: ["idUserRole", "role"],
      },
    ],
  });
};

export const createUserService = async (user) => {
  const userCreated = await UserModel.create({
    email: user.email,
    userRoleId: 3,
    userStatusId: 1,
    createdAt: now(),
    updatedAt: now(),
  });

  return userCreated;
};

export const updateUserService = async (id, userData) => {
  const userSelected = await UserModel.findByPk(id);

  if (!userSelected) return null;

 return await userSelected.update({
    ...userData
  });

   
};
