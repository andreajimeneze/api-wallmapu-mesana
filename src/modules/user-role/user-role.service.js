import { UserRoleModel } from "../../config/dbSequelize.js";

export const getUserRolesService = async () => {
    return UserRoleModel.findAll();
}

export const getUserRoleByIdService = async (id) => {
    return await UserRoleModel.findByPk(id);
}