import { UserRoleModel } from "../../config/dbSequelize.js";

export const getUserRoleService = async (id) => {
    return UserRoleModel.findByPk(id);
}