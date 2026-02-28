import { UserStatusModel } from "../../config/dbSequelize.js";

export const getUsersStatusService = async () => {
    return await UserStatusModel.findAll();
} 

export const getUserStatusByIdService = async (id) => {
    return await UserStatusModel.findByPk(id);
}