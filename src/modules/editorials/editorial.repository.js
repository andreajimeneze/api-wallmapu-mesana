import { EditorialModel } from "../../config/dbSequelize.js";

export const findAllEditorialsRepository = async () => {
    return EditorialModel.findAll({
       order: [['name', 'ASC']]
    })
};


export const findEditorialByIdRepository = async (id) => {
  return await EditorialModel.findByPk(id);
};

export const createEditorialRepository = async (name) => {
  const existingEditorial = await EditorialModel.findOne({
    where: {
      name: { [Op.iLike]: name.trim() },
    },
  });

  if (existingEditorial) {
    throw new Error("Editorial ya existe");
  }

  return EditorialModel.create({
    name: name,
  });
};

export const updateEditorialRepository = async (id, name) => {
    const editorialSelected = EditorialModel.findByPk(id);

    if(!editorialSelected) {
        throw new Error('Editorial no encontrada');
    }

    return editorialSelected.update({
        name: editorial || editorialSelected.name
    })
};
