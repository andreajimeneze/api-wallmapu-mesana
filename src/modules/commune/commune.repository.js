import { CommuneModel, ProvinceModel } from "../../config/dbSequelize.js";

export const findAllCommunesRepository = async () => {
    return await CommuneModel.findAll({
        order: [['commune', 'ASC']],
    });
};