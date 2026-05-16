import { findAllUserRolesRepository } from "./user-role.repository.js";

export const getAllUserRolesService = async () => {
    return await findAllUserRolesRepository();
};