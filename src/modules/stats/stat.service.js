import { findAllAdminRepository, findAllStatesAdminRepository, findAllUseRepository } from "./stat.repository.js";

export const getAllStatesAdminService = async () => {
  return await findAllStatesAdminRepository();
};

export const getAllAdminService = async () => {
  return await findAllAdminRepository();
};

export const getUserStatesService = async(userId) => {
  return await findAllUseRepository(userId);
};
