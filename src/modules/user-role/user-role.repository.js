import { UserRoleModel } from "../../config/dbSequelize.js";

export const findAllUserRolesRepository = async () => {
    return await UserRoleModel.findAll();
};