//import { BookAuthorModel } from "../../config/dbSequelize.js";

import { findAllBookAuthorRepository, bulkCreateBookAuthorRepository, deleteBookAuthorRepository, updateBookAuthorRepository } from "./book_author.repository.js";

export const getAllBookAuthorService = async () => {
  return await findAllBookAuthorRepository();
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

  return await bulkCreateBookAuthorRepository(bookAuthors, options);
};

export const updateBookAuthorService = async(idBook, authors = []) => {
  return await updateBookAuthorRepository(idBook, authors);
};

export const deleteBookAuthorService = async (idBook,  options = {}) => {

  try {
    return await deleteBookAuthorRepository( idBook, options );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
