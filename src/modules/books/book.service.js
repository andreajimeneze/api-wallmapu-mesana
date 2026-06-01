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
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { updateGenreService } from "../genres/genre.service.js";
import { badRequestError, conflictError, notFoundError } from "../../core/helpers/errors/httpErrors.js";
import { findEditionByBookIdRepository } from "../editions/editions.repository.js";


export const getBooksPaginationAndSearchService = async (params) => {
  return await getAllPaginationService(params, getBookPaginationRepository, mapBookDTO);
};
export const getBookByIdService = async (idBook) => {
  const book = await findBookByIdRepository(idBook);
  if (!book) throw notFoundError();
  return book;
};
export const createBookService = async (bookData) => {
  const book = await findBookByTitleRepository(bookData.title);
  if (book) throw conflictError("Ya existe un libro con ese título");

  if(!bookData?.title) throw badRequestError('Libro debe tener tírulo');
  if(!bookData?.summary || bookData?.summary.length < 10) throw badRequestError('Texto debe tener al menos 10 caracteres');
  if(!bookData.genreId) throw badRequestError('Debe incluir género al libro');
  const transaction = await sequelize.transaction();

  try {
     const created = await createBookRepository(bookData, { transaction });

    await createBookSubjectsService(created.idBook, bookData.subjects, {
      transaction,
    });

    await createBookAuthorService(created.idBook, bookData.authors, {
      transaction,
    });


    await transaction.commit();
    return created;

  } catch (error) {
    await transaction.rollback();
    if (error.name === "SequelizeValidationError") {
      throw validationError();
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw uniqueConstraintError();
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw foreignKeyError();
    }
    throw error;
  }
};
export const updateBookService = async (idBook, bookData) => {
  const exists = await findBookByIdRepository(idBook);
  if (!exists) throw notFoundError();

  const transaction = await sequelize.transaction();

  try {
    await updateBookSubjectService(exists.idBook, bookData.subjects, { transaction });
    await updateBookAuthorService(exists.idBook, bookData.authors, { transaction });
    const updated = await updateBookRepository(exists.idBook, bookData, { transaction });

    await transaction.commit();
    return updated;
  } catch (error) {
    await transaction.rollback();
    if (error.name === "SequelizeValidationError") {
      throw validationError();
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw uniqueConstraintError();
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw foreignKeyError();
    }
    throw error;
  }
};
export const deleteBookService = async (idBook) => {
  const editionExists = await findEditionByBookIdRepository(idBook);
  if (editionExists) throw conflictError("Debe eliminar las ediciones para poder borrar el libro");

  const transaction = await sequelize.transaction();

  try {
    await deleteBookAuthorByIdBookRepository(idBook, { transaction })

    await deleteBookSubjectByIdBookRepository(idBook, { transaction });
    const deleted = await deleteBookRepository(idBook, { transaction });
    await transaction.commit();
    return deleted;
  } catch (error) {
    await transaction.rollback();
    if (error.name === "SequelizeValidationError") {
      throw validationError();
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      throw uniqueConstraintError();
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw foreignKeyError();
    }
    throw error;
  }
};
