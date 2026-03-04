import { EditorialModel } from "../../config/dbSequelize.js";

export const getAllEditorialsService = async () => {
    return await EditorialModel.findAll();
}

export const getEditorialByIdService = async (id) => {
  return await EditorialModel.findByPk(id);
};

export const createEditorialService = async (editorial) => {
  const existingEditorial = await findOne({
    where: {
      editorial: { [Op.iLike]: editorial.trim() },
    },
  });

  if (existingEditorial) {
    throw new Error("Editorial ya existe");
  }

  return EditorialModel.create({
    editorial: editorial.editorial,
  });
};

export const updateEditorialService = async (id, editorial) => {
    const editorialSelected = EditorialModel.findByPk(id);

    if(!editorialSelected) {
        throw new Error('Editorial no encontrada');
    }

    return editorialSelected.update({
        editorial: editorial || editorialSelected.editorial
    })
}
