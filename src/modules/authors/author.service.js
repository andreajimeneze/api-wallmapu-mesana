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

// export const getAuthorByNameService = async (name) => {
//   return await AuthorModel.findOne({
//     where: { name: { [Op.iLike]: name.trim() } },
//   });
// };

export const createAuthorService = async ({ id }, options = {}) => {
  const existingAuthor = await AuthorModel.findByPk(id);

  if (existingAuthor) {
    throw new Error("Autor ya existe");
  }

  const dto = createAuthorDTO({
    name,
  });

  return AuthorModel.create(dto, options);
};

// export const getOrCreateAuthorService = async (authorNames, options = {}) => {
//   const authorIds = [];

//   for (const name of authorNames) {
//     let author = await getAuthorByNameService(name, options);

//     if (!author) {
//       author = await createAuthorService({ name }, options);
//     }

//     authorIds.push(author.idAuthor);
//   }
//   return authorIds;
// };
