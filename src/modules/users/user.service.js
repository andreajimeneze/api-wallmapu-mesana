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
import { conflictError, notFoundError, unauthorizedError } from "../../core/helpers/errors/httpErrors.js";

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

export const updateUserService = async (targetUser, authenticatedUser, userData, options = {}) => {
  const user = await findUserByIdRepository(targetUser);
  if (!user) throw notFoundError();
  
  const { sub, role } = authenticatedUser;
  const currentUser = sub;
  console.log('usuario actual: ', currentUser)
  console.log('sub', sub, 'role', role)
  console.log('authenticadeUser', authenticatedUser)

  const isSelfUser = targetUser === currentUser;

  if(role !== 'Lector' && isSelfUser) {
       delete userData.userRoleId,
       delete userData.userStatusId
  }

  if(role === 'Lector' && !isSelfUser) throw conflictError('No puede modificar a otro usuario');
  

  return await updateUserRepository(targetUser, userData, options);
};

export const updateUserByAdminService = async (targetUser, authenticatedUser, userData, options = {}) => {
  const user = await findUserByIdRepository(targetUser);
  if (!user) throw notFoundError();
  
  const { sub, role } = authenticatedUser;
  const currentUser = sub;

  const isSelfUser = targetUser === currentUser;

  if(role === 'Admin' && isSelfUser) {
       delete userData.userRoleId,
       delete userData.userStatusId
  }
  return await updateUserRepository(targetUser, userData, options);
};