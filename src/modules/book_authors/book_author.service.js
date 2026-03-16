import { BookAuthorModel } from "../../config/dbSequelize.js";

export const getAllBookAuthorService = async () => {
  return await findAll();
}

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

export const deleteBookAuthorService = async (idBook, transaction = null) => {
  console.log('ID BOOK BOOK-AUTHOR SERVICE: ', idBook)
  try {
    await BookAuthorModel.destroy(
      {
        where: { bookId: idBook },
      },
      transaction,
    );

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
