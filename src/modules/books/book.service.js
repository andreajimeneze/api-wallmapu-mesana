import { sequelize } from "../../config/dbSequelize.js";
import { bookResponseDTO, updateBookDTO } from "./book.dto.js";
import { Op } from "sequelize";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";
import { createBookRepository, deleteBookRepository, findBookByIdRepository, findBookByTitleRepository, getBookPaginationRepository, updateBookRepository } from "./book.repository.js";
import { createBookAuthorService, deleteBookAuthorService, updateBookAuthorService } from "../book_authors/book_author.service.js";
import { createBookSubjectsService, deleteBookSubjectService, updateBookSubjectService } from "../book_subjects/book_subject.service.js";
import { deleteBookAuthorByIdBookRepository } from "../book_authors/book_author.repository.js";
import { deleteBookSubjectByIdBookRepository, findAllBookSubjectByIdBookRepository } from "../book_subjects/book_subject.respository.js";
import { findEditionByBookIdRepository } from "../editions/editions.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";


export const getBooksPaginationAndSearchService = async (params) => {
  return await getAllPaginationService(params, getBookPaginationRepository, bookResponseDTO);
};

// export const getAllBooksService = async () => {
//   return await findAllBooksRepository();
// };

export const getBookByIdService = async (id) => {
  return await findBookByIdRepository(id);
};

export const createBookService = async (bookData) => {

  const exists = await findBookByTitleRepository(bookData.title);

  if (exists) {
    throw new Error("Ya existe un libro con ese título");
  }

  const transaction = await sequelize.transaction();

  try {
    const book = await createBookRepository(bookData, { transaction });

    await createBookSubjectsService(book.idBook, bookData.subjects, {
      transaction,
    });

    await createBookAuthorService(book.idBook, bookData.authors, {
      transaction,
    });

    await transaction.commit();

    const bookComplete = await findBookByIdRepository(book.idBook);

    return bookComplete.idBook ? bookComplete : null;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const updateBookService = async (idBook, data) => {
  const searchedBook = await findBookByIdRepository(idBook);

  if (!searchedBook) {
    throw new Error("Libro no encontrado");
  }

  const transaction = await sequelize.transaction();

  try {
    const bookDto = updateBookDTO(data);

    const updatedBook = await updateBookRepository(searchedBook.idBook, bookDto, { transaction });

    await updateBookSubjectService(searchedBook.idBook, bookDto.subjects, { transaction });

    await updateBookAuthorService(searchedBook.idBook, bookDto.authors, { transaction });

    await transaction.commit();
    return searchedBook;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const deleteBookService = async (id) => {

  const transaction = await sequelize.transaction();
  try {
    const bookToDelete = await getBookByIdService(id);

    const editionExists = await findEditionByBookIdRepository(id);

    if (editionExists) {
      throw new Error(
        "Debe eliminar las ediciones para poder borrar el libro",
      );
    }

    await deleteBookAuthorByIdBookRepository(id, transaction)

    await deleteBookSubjectByIdBookRepository(id, transaction);

    return await deleteBookRepository(id, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
