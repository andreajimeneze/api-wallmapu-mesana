import { BookModel, GenreModel } from "../../config/dbSequelize.js";
import { bookResponseDTO } from "./book.dto.js";
import { Op } from "sequelize";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";

export const getBooksPaginationAndSearchService = async ({
  page,
  limit,
  search,
}) => {
  limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
  page = Number.isInteger(Number(page)) ? Number(page) : 1;

   console.log('página en service', page)

  const DEFAULT_LIMIT = 1;
  const MAX_LIMIT = 100;

  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  } else if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

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
          ? `/book?page=${page + 1}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/book?page=${page - 1}&items=${limit}&search=${search}`
          : null,
      result: result.map(bookResponseDTO),
    }),
  };
};

export const getAllBooksService = () => {
    return BookModel.findAll({
        include: [{
            model: GenreModel,
            as: 'genre'
        }]
    });
}

export const getBookByIdService = (id) => {
    return BookModel.findByPk(id, {
        include: [{
            model: GenreModel,
            as: 'genre'
        }]
    });
}