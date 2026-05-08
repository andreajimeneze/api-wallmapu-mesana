import { CommuneModel } from "../../config/dbSequelize.js";

export const findAllCommunsWithProvinceRepository = async () => {
    return await CommuneModel.findAll({
        include: [{
            model: ProvinceModel,
            as: 'province',
            attributes: ['idProvince', 'province', 'regionId']
        }],
        order: [['commune', 'ASC']],
    });
};

export const findCommuneByIdWithProvinceRepository = async (id) => {
    return await CommuneModel.findByPk(id, {
        include: [{
            model: ProvinceModel,
            as: 'province',
            attributes: ['idProvince', 'province', 'regionId']
        }]
    });
};