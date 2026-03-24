import { CommuneModel, ProvinceModel } from "../../config/dbSequelize.js";

export const getAllCommuneService = async () => {
    const communes = await CommuneModel.findAll({
        order: [['commune', 'ASC']],
        include: [{
            model: ProvinceModel,
            as: 'province',
            attributes: ['idProvince', 'province', 'regionId']
        }]
    });
   
    return communes;
}

export const getCommuneByIdService = (id) => {
    return CommuneModel.findByPk(id, {
    include: [
      {
        model: ProvinceModel,
        as: "province",
        attributes: ['idProvince', 'province', 'regionId']
      },
    ],
  });
}