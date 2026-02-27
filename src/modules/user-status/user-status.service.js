import { UserStatusModel } from "../../config/dbSequelize.js";

export const getUsersStatusService = async () => {
    return await UserStatusModel.findAll();
} 