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
import {
  createBookSubjectsService,
  deleteBookSubjectService,
} from "../book_subjects/book_subject.service.js";
import {
  createBookAuthorService,
  deleteBookAuthorService,
} from "../book_authors/book_author.service.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";

export const getBooksPaginationAndSearchService = async (params) => {
  const { page, limit, search } = paginationRequestDTO(params);

  normalizePagination(page, limit);

  const include = [
    {
      model: GenreModel,
      as: "genre",
      required: false,
    },
    {
      model: AuthorModel,
      as: "authors",
      through: { attributes: [] },
    },
    {
      model: SubjectModel,
      as: "subjects",
      through: { attributes: [] },
    },
    {
      model: EditionModel,
      as: "editions",
      include: [
        {
          model: EditorialModel,
          as: "editorial",
        },
        {
          model: CopyModel,
          as: "copies",
          include: [
            {
              model: CopyStatusModel,
              as: "status",
            },
          ],
        },
      ],
    },
  ];

  const where = search
    ? {
      [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }],
    }
    : {};


  const offset = (page - 1) * limit;


  const { count: items, rows: result } = await BookModel.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
    order: [["updated_at", "DESC"]],
  });

  if (items === 0) {
    return emptyPaginationDTO({ page, pages, items, next, prev, data })
  }

  const pages = Math.ceil(items / limit);

  const haveSearch = search && search.trim() !== "";

  if (page > pages && page > 0) {
    page = haveSearch ? 1 : pages;
  } else if (page < 1) {
    page = 1;
  }

  const urlResponse = paginationUrl('pagination', page, pages, limit, search);
  return {
    response: "Libros obtenidos exitosamente",
    data: paginationResponseDTO({
      page,
      pages,
      items,
      urlResponse,
      data: result.map(bookResponseDTO),
    }),
  };
};

export const getAllBooksService = async () => {
  return await BookModel.findAll();
};

export const getBookByIdService = async (id) => {
  return await BookModel.findByPk(id, {
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
        include: [
          {
            model: EditorialModel,
            as: 'editorial'
          },
          {
            model: CopyModel,
            as: "copies",
            include: [
              {
                model: CopyStatusModel,
                as: "status",
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    ],
  });
};

export const createBookService = async (bookData) => {

  const exists = await BookModel.findOne({
    where: { title: { [Op.iLike]: bookData.title.trim() } },
  });

  if (exists) {
    const error = new Error("Ya existe un libro con ese título");
    error.status = 409;
    throw error;
  }

  const transaction = await sequelize.transaction();
  try {
    const book = await BookModel.create(
      bookData,

      { transaction },
    );

    await createBookSubjectsService(book.idBook, bookData.subjects, {
      transaction,
    });

    await createBookAuthorService(book.idBook, bookData.authors, {
      transaction,
    });

    await transaction.commit();

    const bookComplete = await BookModel.findByPk(book.idBook, {
      include: [
        {
          model: GenreModel,
          as: "genre",
          attributes: ["idGenre", "name"],
        },
        {
          model: AuthorModel,
          as: "authors",
        },
        {
          model: SubjectModel,
          as: "subjects",
        },
        {
          model: EditionModel,
          as: "editions",
          include: [
            {
              model: CopyModel,
              as: "copies",
            },
          ],
        },
      ],
    });

    return bookComplete.idBook ? bookComplete : null;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateBookService = async (id, bookData) => {
  const searchedBook = await BookModel.findByPk(id);

  if (!searchedBook) {
    throw new Error("Libro no encontrado");
  }

  const transaction = await sequelize.transaction();

  try {
    const bookDto = updateBookDTO(bookData);

    if (!bookDto.authors || bookDto.authors.length === 0) {
      throw new Error("No puede dejar un libro sin autores");
    }

    if (!bookDto.subjects || bookDto.subjects.length === 0) {
      throw new Error("No puede dejar un libro sin descriptores");
    }

    const updatedBook = await searchedBook.update(bookDto, { transaction });

    await deleteBookAuthorService(id, { transaction });

    await createBookAuthorService(id, bookDto.authors, { transaction });

    await deleteBookSubjectService(id, { transaction });

    await createBookSubjectsService(id, bookDto.subjects, { transaction });

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
