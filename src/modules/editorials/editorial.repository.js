import { EditorialModel } from "../../config/dbSequelize.js";

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