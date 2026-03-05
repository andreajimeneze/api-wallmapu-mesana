import { CopyStatusModel } from "../../config/dbSequelize.js";

export const getAllStatusCopyService = async () => {
    return await CopyStatusModel.findAll();
};

export const getStatusCopyByIdService = async (id) => {
    return await CopyStatusModel.findByPk(id);
};

