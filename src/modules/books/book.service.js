import { sequelize } from "../../config/dbSequelize.js";
import { bookResponseDTO, mapBookDTO, updateBookDTO } from "./book.dto.js";
import { Op } from "sequelize";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/pagination/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/pagination/paginationUrl.js";
import { createBookRepository, deleteBookRepository, findBookByIdRepository, findBookByTitleRepository, getBookPaginationRepository, updateBookRepository } from "./book.repository.js";
import { createBookAuthorService, deleteBookAuthorService, updateBookAuthorService } from "../book_authors/book_author.service.js";
import { createBookSubjectsService, deleteBookSubjectService, updateBookSubjectService } from "../book_subjects/book_subject.service.js";
import { deleteBookAuthorByIdBookRepository } from "../book_authors/book_author.repository.js";
import { deleteBookSubjectByIdBookRepository } from "../book_subjects/book_subject.respository.js";
import { findEditionByBooIdRepository } from "../editions/editions.repository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { updateGenreService } from "../genres/genre.service.js";


export const getBooksPaginationAndSearchService = async (params) => {
  return await getAllPaginationService(params, getBookPaginationRepository, mapBookDTO);
};

// export const getAllBooksService = async () => {
//   return await findAllBooksRepository();
// };

export const getBookByIdService = async (idBook) => {
  return await findBookByIdRepository(idBook);
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

    //const bookComplete = await findBookByIdRepository(book.idBook);

    return await findBookByIdRepository(book.idBook);
    //return bookComplete.idBook ? bookComplete : null;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const updateBookService = async (idBook, bookData) => {
  const exists = await findBookByIdRepository(idBook);

  if (!exists) {
    throw new Error("Libro no encontrado");
  }

  const transaction = await sequelize.transaction();

  try {
    await updateBookRepository(exists.idBook, bookData, { transaction });

    await updateBookSubjectService(exists.idBook, bookData.subjects, { transaction });

    await updateBookAuthorService(exists.idBook, bookData.authors, { transaction });

    //await updateGenreService(exists.genreId, { transaction });

    await transaction.commit();
    return await findBookByIdRepository(idBook);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const deleteBookService = async (idBook) => {

  const transaction = await sequelize.transaction();
  try {
    const editionExists = await findEditionByBooIdRepository(idBook);

    if (editionExists) {
      throw new Error(
        "Debe eliminar las ediciones para poder borrar el libro",
      );
    }

    await deleteBookAuthorByIdBookRepository(idBook, { transaction })

    await deleteBookSubjectByIdBookRepository(idBook, { transaction });

    const deleted = await deleteBookRepository(idBook, { transaction });
    if(!deleted) {
      throw new Error('No se pudo eliminar el libro');
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
