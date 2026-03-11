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
} from "../../config/dbSequelize.js";
import { bookResponseDTO, createBookDTO, updateBookDTO } from "./book.dto.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { createBookSubjectsService } from "../book_subjects/book_subject.service.js";
import { createBookAuthorService } from "../book_authors/book_author.service.js";

export const getBooksPaginationAndSearchService = async ({
  page,
  limit,
  search,
}) => {
  limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
  page = Number.isInteger(Number(page)) ? Number(page) : 1;

  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  limit = Number(limit) || DEFAULT_LIMIT;
  page = Number(page) || 1;

  if (limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { genre: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const items = await BookModel.count({
    where,
  });

  if (items === 0) {
    return {
      response: "No se encontraron libros",
      result: paginationResponseDTO({
        page: 0,
        pages: 0,
        items: 0,
        next: "none",
        prev: "none",
        result: [],
      }),
    };
  }

  const pages = Math.ceil(items / limit);

  const haveSearch = search && search.trim() !== "";

  if (page > pages && page > 0) {
    page = haveSearch ? 1 : pages;
  } else if (page < 1) {
    page = 1;
  }

  const offset = (page - 1) * limit;

  const result = await BookModel.findAll({
    where,
    limit,
    offset,
    distinct: true,
    order: [
      ["created_at", "DESC"],
      [{ model: GenreModel, as: "genre" }, "idGenre", "ASC"],
    ],
    include: [
      {
        model: GenreModel,
        as: "genre",
        attributes: ["idGenre", "name"],
      },
      {
        model: AuthorModel,
        as: "authors",
        attributes: ["idAuthor", "name"],
        through: { attributes: [] },
      },
      {
        model: SubjectModel,
        as: "subjects",
        attributes: ["idSubject", "name"],
        through: { attributes: [] },
      },
      {
        model: EditionModel,
        as: "editions",
        attributes: [
          "idEdition",
          "isbn",
          "publicationYear",
          "pages",
          "coverImage",
        ],
        include: [
          {
            model: EditorialModel,
            as: "editorial",
            attributes: ["idEditorial", "name"],
          },
          {
            model: CopyModel,
            as: "copies",
            attributes: [
              "idCopy",
              "barcode",
              "signatureTopography",
              "copyNumber",
            ],
            include: [
              {
                model: CopyStatusModel,
                as: "status",
                attributes: ["idStatus", "name"],
              },
            ],
          },
        ],
      },
    ],
  });

  return {
    response: "Libros obtenidos exitosamente",
    result: paginationResponseDTO({
      page,
      pages,
      items,
      next:
        page < pages
          ? `/books?page=${page + 1}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/books?page=${page - 1}&items=${limit}&search=${search}`
          : null,
      result: result.map(bookResponseDTO),
    }),
  };
};

export const getBookByIdService = (id) => {
  return BookModel.findByPk(id, {
    include: [
      {
        model: GenreModel,
        as: "genre",
        attributes: ["idGenre", "name"],
      },
      {
        model: AuthorModel,
        as: "authors",
        attributes: ["idAuthor", "name"],
        through: { attributes: [] },
      },
      {
        model: SubjectModel,
        as: "subjects",
        attributes: ["idSubject", "name"],
        through: { attributes: [] },
      },
      {
        model: EditionModel,
        as: "editions",
        attributes: [
          "idEdition",
          "isbn",
          "publicationYear",
          "pages",
          "coverImage",
        ],
        include: [
          {
            model: EditorialModel,
            as: "editorial",
            attributes: ["idEditorial", "name"],
          },
          {
            model: CopyModel,
            as: "copies",
            attributes: [
              "idCopy",
              "barcode",
              "signatureTopography",
              "copyNumber",
            ],
            include: [
              {
                model: CopyStatusModel,
                as: "status",
                attributes: ["idStatus", "name"],
              },
            ],
          },
        ],
      },
    ],
  });
};

export const createBookService = async (bookData) => {
  const bookDto = createBookDTO(bookData);

  const exists = await BookModel.findOne({
    where: { title: { [Op.iLike]: bookDto.title.trim() } },
  });

  if (exists) {
    throw new Error("Ya existe un libro con ese título");
  }

  const transaction = await sequelize.transaction();
  try {
    const book = await BookModel.create(
      {
        title: bookDto.title,
        summary: bookDto.summary,
        genreId: bookDto.genre_id,
      },
      { transaction },
    );

    await createBookSubjectsService(book.idBook, bookDto.subjects, {
      transaction,
    });

    await createBookAuthorService(book.idBook, bookDto.authors, {
      transaction,
    });

    await transaction.commit();

    const bookComplete = await getBookByIdService(book.idBook);

    return bookResponseDTO(bookComplete);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateBookService = async (id, dto) => {
  const searchedBook = await BookModel.findByPk(id);

  if (!searchedBook) {
    throw new Error("Libro no existe");
  }

  const transaction = await sequelize.transaction();

  try {
    const bookDto = updateBookDTO(dto);

    const updatedBook = await searchedBook.update(bookDto);
    await transaction.commit();
    return updatedBook;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
