import { CommuneModel, ProvinceModel } from "../../config/dbSequelize.js";

export const getAllCommuneService = async () => {
    const communes = await CommuneModel.findAll({
        include: [{
            model: ProvinceModel,
            as: 'province',
            attributes: ['idProvince', 'province', 'regionId']
        }]
    });
    console.log('comunas desde service: ', communes)
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