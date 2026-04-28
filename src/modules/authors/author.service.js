import { Op } from "sequelize";
import { AuthorModel, BookAuthorModel } from "../../config/dbSequelize.js";
import { createAuthorDTO } from "./author.dto.js";

export const getAllAuthorsService = async () => {
  return await AuthorModel.findAll({
    order: [['name', 'ASC']]
  });
};

export const getAuthorByIdService = async (id) => {
  return await AuthorModel.findByPk(id);
};

export const createAuthorService = async ({ id }, options = {}) => {
  const existingAuthor = await AuthorModel.findByPk(id);

  if (existingAuthor) {
    const error = new Error("Autor ya existe");
    error.status = 409;
    throw error;
  }

  const dto = createAuthorDTO({
    name,
  });

  return AuthorModel.create(dto, options);
};

export const updateAuthorService = async (id, name) => {
  const selectedAuthor = await AuthorModel.findByPk(id);

  if (!selectedAuthor) {
    throw new Error('Autor no encontrado');
  };

  const existsAuthor = await AuthorModel.findOne({
    where: {
      name: name,
      id: { [Op.ne]: id }
    }
  });

  if(existsAuthor) {
    throw new Error('Autor ya existe en otro registro');
  };

  return await selectedAuthor.update({name});
};

export const deleteAuthorService = async (id) => {
  const selectedAuthor = await AuthorModel.findByPk(id);

  if (!selectedAuthor) {
    throw new Error('Autor no encontrado');
  };

  const authorBook = await BookAuthorModel.findOne({
    where: {
      authorId: id,
      attributes: ['authorId']
    }
  });

  if (authorBook) {
    throw new Error('No puede eliminar un autor asignado a un libro existente');
  };

  await selectedAuthor.destroy();

  return true;
};

