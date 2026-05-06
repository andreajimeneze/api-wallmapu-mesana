import {
  BookModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  SubjectModel,
  AuthorModel,
  CopyModel,
  CopyStatusModel,
  sequelize,
  BookAuthorModel,
  BookSubjectModel,
} from "../../config/dbSequelize.js";
import { bookResponseDTO, updateBookDTO } from "./book.dto.js";
import { Op } from "sequelize";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";
import { createBookRepository, findBookByIdRepository, findBookByTitleRepository, getBookPaginationRepository } from "./book.repository.js";
import { createBookAuthorService, deleteBookAuthorService, updateBookAuthorService } from "../book_authors/book_author.service.js";
import { createBookSubjectsService, deleteBookSubjectService, updateBookSubjectService } from "../book_subjects/book_subject.service.js";


export const getBooksPaginationAndSearchService = async (params) => {
  const { page, limit, search } = paginationRequestDTO(params);

  normalizePagination(page, limit);

  const { count: items, rows: result } = await getBookPaginationRepository({ page, limit, search });

  const pages = Math.ceil(items / limit);


  const haveSearch = search && search.trim() !== "";

  let currentPage = page

  if (page > pages && page > 0) {
    currentPage = haveSearch ? 1 : pages;
  } else if (page < 1) {
    currentPage = 1;
  }

  const urlResponse = paginationUrl('pagination', page, pages, limit, search);
  if (items === 0) {
    return emptyPaginationDTO({ page: currentPage, pages, items, urlResponse })
  };

  return {
    response: "Libros obtenidos exitosamente",
    data: paginationResponseDTO({
      page: currentPage,
      pages,
      items,
      urlResponse,
      data: result.map(bookResponseDTO),
    }),
  };
};

export const getAllBooksService = async () => {
  return await findAllBookAuthorRepository();
};

export const getBookByIdService = async (id) => {
  return await findBookByIdRepository(id);
};

export const createBookService = async (bookData) => {

  const exists = await findBookByTitleRepository(bookData.title);

  if (exists) {
    const error = new Error("Ya existe un libro con ese título");
    error.status = 409;
    throw error;
  }

  const transaction = await sequelize.transaction();
  
  try {
    const book = await createBookRepository(bookData,{ transaction } );

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

export const updateBookService = async (data) => {
  const searchedBook = await findBookByIdRepository(data.idBook);

  if (!searchedBook) {
    const error = new Error("Libro no encontrado");
    error.status = 404;
    throw error;
  }

  const transaction = await sequelize.transaction();

  try {
    const bookDto = updateBookDTO(data);

    const updatedBook = await searchedBook.update(bookDto, { transaction });

    await updateBookSubjectService(updatedBook.idBook, bookDto.subjects, { transaction });

    await updateBookAuthorService(updatedBook.idBook, bookDto.authors, { transaction });

    await transaction.commit();
    return updatedBook;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteBookService = async (id) => {

  const bookToDelete = await getBookByIdService(id);

  const authorsExists = await BookAuthorModel.findAll({
    where: { idBook: id },
  });

  const subjectsExists = await BookSubjectModel.findAll({
    where: { idBook: id },
  });

  const editionsExists = await EditionModel.findAll({
    where: { bookId: id },
  });

  if (editionsExists.length > 0) {
    throw new Error(
      "Debe eliminar las ediciones para poder borrar el libro",
    );
  }

  const transaction = await sequelize.transaction();
  try {
    if (authorsExists.length > 0) {
      await deleteBookAuthorService(id, transaction)
    };

    if (subjectsExists.length > 0) {
      await deleteBookSubjectService(id, transaction);
    };

    await bookToDelete.destroy({ transaction });
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
