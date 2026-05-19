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
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { getAllUsersPaginationWithSearchRepository } from "./user.repository.js";

export const getUsersPaginationSearchService = async (params) => {
  return await getAllPaginationService(params, getAllUsersPaginationWithSearchRepository, userCompleteResponseDTO);
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
