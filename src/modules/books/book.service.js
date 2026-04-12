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
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import {
  createBookSubjectsService,
  deleteBookSubjectService,
} from "../book_subjects/book_subject.service.js";
import {
  createBookAuthorService,
  deleteBookAuthorService,
} from "../book_authors/book_author.service.js";

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

  const include = [
    {
      model: GenreModel,
      as: "genre",
      attributes: ["idGenre", "name"],
      required: false,
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
  ];

  const where = search
    ? {
        [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }],
      }
    : {};

  const items = await BookModel.count({
    include,
    where,
    distinct: true,
    col: "id_book",
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
    include,
    limit,
    offset,
    distinct: true,
    order: [["updated_at", "DESC"]],
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

export const getAllBooksService = async() => {
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
    throw new Error("Libro no existe");
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
  try {
    const bookToDelete = await getBookByIdService(id);

    const authorsExists = await BookAuthorModel.findOne({
      where: { idBook: id },
    });

    const subjectsExists = await BookSubjectModel.findOne({
      where: { idBook: id },
    });

    const editionsExists = await EditionModel.findOne({
      where: { bookId: id },
    });

    if (authorsExists || subjectsExists || editionsExists) {
      throw new Error(
        "El libro tiene autores, descriptores o ediciones asociadas",
      );
    }

    await bookToDelete.destroy(id);
    return true;
  } catch (error) {
    throw error;
  }
};
