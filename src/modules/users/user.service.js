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
import { createUserRepository, findUserByEmailRepository, findUserByIdRepository, getAllUsersPaginationWithSearchRepository, updateUserRepository } from "./user.repository.js";
import { notFoundError, unauthorizedError } from "../../core/helpers/errors/httpErrors.js";

export const getUsersPaginationSearchService = async (params) => {
  return await getAllPaginationService(params, getAllUsersPaginationWithSearchRepository, userCompleteResponseDTO);
};

export const getUserByIdService = async (id) => {
  const user = await findUserByIdRepository(id);
  if (!user) throw notFoundError();
  return user;
};

export const getUserByEmailService = async (email) => {
  const userByEmail = await findUserByEmailRepository(email);
  if (!userByEmail) throw notFoundError();
  return userByEmail;
};

export const createUserService = async (user, options = {}) => {
  return await createUserRepository(user, options);
};

export const updateUserService = async (id, userData, options = {}) => {
  const user = await findUserByIdRepository(id);
  if (!user) throw notFoundError();

  return await updateUserRepository(id, userData, options);
};
