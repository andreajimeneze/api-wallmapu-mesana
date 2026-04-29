import { BookAuthorModel } from "../../config/dbSequelize.js";

export const getAllBookAuthorService = async () => {
  return await findAll();
}

export const createBookAuthorService = async (
  idBook,
  authors = [],
  options = {},
) => {
  const bookAuthors = authors.map((idAuthor) => ({
    idBook,
    idAuthor,
  }));

  return await BookAuthorModel.bulkCreate(bookAuthors, options);
};

export const deleteBookAuthorService = async (idBook, transaction = null) => {

  try {
    await BookAuthorModel.destroy({
     where: { idBook },   
      ...(transaction && { transaction })
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
