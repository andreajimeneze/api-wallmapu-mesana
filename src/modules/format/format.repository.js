import { Op } from "sequelize";
import { FormatModel } from "../../config/dbSequelize.js";

export const getAllFormatPaginationRepository = async ({ page, limit, search }) => {

  const where = search
    ? {
      [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
    }
    : {};


  const offset = (page - 1) * limit;

  const items = await FormatModel.count({ where });
  const result = await FormatModel.findAll({
    where,
    limit,
    offset,
    raw: true,
    order: [['updated_at', 'DESC']]
  });

  return { count: items, rows: result };

};

export const findAllFormatsRepository = async () => {
  return await FormatModel.findAll({
    order: [['name', 'ASC']]
  });
};

export const findFormatByIdRepository = async (id) => {
  return await FormatModel.findByPk(id);
};

export const findFormatByNameRepository = async (name) => {
  return await FormatModel.findOne({
    where: {
      name: { [Op.iLike]: name }
    }
  });
};

export const createFormatRepository = async (name, options = {}) => {

  return await FormatModel.create(name, options);
};

export const updateFormatRepository = async (id, data, options = {}) => {

  const [count, [updatedFormat]] = await FormatModel.update(
     {name: data} ,
    {
      where: { idFormat: id },
      ...options, returning: true
    });
    if(count === 0) return null;
    return updatedFormat;
};

export const deleteFormatRepository = async (id, options = {}) => {
  return await FormatModel.destroy({
    where: {
      idFormat: id
    }, ...options
  });
};

