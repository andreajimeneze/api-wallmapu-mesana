import { UserStatusModel } from "../../config/dbSequelize.js";

export const getUserStatusService = async (id) => {
    return await UserStatusModel.findByPk(id);
} 