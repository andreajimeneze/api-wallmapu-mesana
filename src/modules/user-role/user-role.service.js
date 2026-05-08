import { findAllUserRolesRepository, findUserRoleByIdRepository } from "./user-role.repository.js";

export const getAllUserRolesService = async () => {
    return await findAllUserRolesRepository();
};

export const getUserRoleByIdService = async (id) => {
    return await findUserRoleByIdRepository(id);
};