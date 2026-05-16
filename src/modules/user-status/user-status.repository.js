import { UserStatusModel } from "../../config/dbSequelize.js";

export const findAllUserStatusRepository = async () => {
    return await UserStatusModel.findAll();
};
