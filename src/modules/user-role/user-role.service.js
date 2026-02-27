import { UserRoleModel } from "../../config/dbSequelize.js";

export const getUserRolesService = async () => {
    return UserRoleModel.findAll();
}