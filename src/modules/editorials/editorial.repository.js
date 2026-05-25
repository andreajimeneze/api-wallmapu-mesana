import { Op } from "sequelize";
import { EditorialModel } from "../../config/dbSequelize.js";

export const getAllEditorialsPaginationRepository = async ({ page, limit, search }) => {

    const where = search
        ? {
            [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
        }
        : {};


    const offset = (page - 1) * limit;

    const items = await EditorialModel.count({ where });
    const result = await EditorialModel.findAll({
        where,
        limit,
        offset,
        raw: true,
        order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };

};
export const findAllEditorialsRepository = async () => {
  return EditorialModel.findAll({
    order: [['name', 'ASC']]
  })
};
export const findEditorialByIdRepository = async (id) => {
  return await EditorialModel.findByPk(id);
};
export const existingEditorial = async (name) => {
  await EditorialModel.findOne({
    where: {
      name: { [Op.iLike]: name.trim() },
    },
  });
}
export const createEditorialRepository = async (name, options) => {
  return await EditorialModel.create({
    name: name,
  });
};
export const updateEditorialRepository = async (id, name, options = {}) => {
  const [count, [updatedEditorial]] = await editorialSelected.update(
    { name: name },
    {
      where: {
        idEditorial: id
      }, ...options, returning: true
    }
  )
};
export const deleteEditorialRepository = async (id) => {
  return await EditorialModel.destroy({
    where:
    {
      idEditorial: id
    }
  })
}