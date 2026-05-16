//import { BookAuthorModel } from "../../config/dbSequelize.js";

import { sequelize } from "../../config/dbSequelize.js";
import { bulkCreateBookAuthorRepository, deleteBookAuthorByIdBookRepository, deleteBookAuthorRepository } from "./book_author.repository.js";

// export const getAllBookAuthorService = async () => {
//   return await findAllBookAuthorRepository();
// }

export const createBookAuthorService = async (
  idBook,
  authors = [],
  options = {},
) => {
  const bookAuthors = authors.map((idAuthor) => ({
    idBook,
    idAuthor,
  }));

  return await bulkCreateBookAuthorRepository(bookAuthors, options);
};

export const updateBookAuthorService = async (idBook, authors = [], options) => {
    const transaction = await sequelize.transaction();

    try {
        await deleteBookAuthorByIdBookRepository(idBook, { transaction });

        const bookAuthors = authors.map((idAuthor) => ({
            idBook,
            idAuthor
        }));

        await bulkCreateBookAuthorRepository(bookAuthors, { transaction });

        await transaction.commit();
        return true;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteBookAuthorService = async (idBook,  options = {}) => {
    return await deleteBookAuthorRepository( idBook, options );
};
