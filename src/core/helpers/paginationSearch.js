import { Op } from "sequelize";

export const buildSearchWhere = (search, fields) => {
  if (!search || !search.trim()) return {};

  return {
    [Op.or]: fields.map(field => ({
      [field]: { [Op.iLike]: `%${search}%` }
    }))
  };
};