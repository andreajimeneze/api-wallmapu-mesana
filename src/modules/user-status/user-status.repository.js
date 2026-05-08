import { UserStatusModel } from "../../config/dbSequelize.js";

export const findAllUserStatusRepository = async () => {
    return await UserStatusModel.findAll();
};

export const findUserStatusByIdRepository = async (id) => {
    return await UserStatusModel.findByPk(id);
};