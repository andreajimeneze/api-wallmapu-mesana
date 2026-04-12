import { AuthorModel } from "../../config/dbSequelize.js";
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

