import { ProvinceModel } from "../../config/dbSequelize.js";

export const findAllProvincesRepository = async () => {
    return ProvinceModel.findAll({
            order: [['province', 'ASC']],
        });
};