import { UserRoleModel } from "../../config/dbSequelize.js";

export const findAllUserRolesRepository = async () => {
    return UserRoleModel.findAll();
};

export const findUserRoleByIdRepository = async (id) => {
    return UserRoleModel.findByPk(id);
};