import { BookAuthorModel } from "../../config/dbSequelize.js";

export const createBookAuthorService = async (
  idBook,
  authors = [],
  options = {},
) => {

  const bookAuthors = authors.map((authorId) => ({
    bookId: idBook,
    authorId: authorId,
  }));

  return await BookAuthorModel.bulkCreate(bookAuthors, options);
};
