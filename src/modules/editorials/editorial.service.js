import { EditorialModel } from "../../config/dbSequelize.js";
import { editorialResponseDTO } from "./editorial.dto.js";

export const getEditorialsPaginationService = async ({ page, limit, search }) => {
  limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;
  page = Number.isInteger(Number(page)) ? Number(page) : 1;

  const DEFAULT_LIMIT = 1;
  const MAX_LIMIT = 100;

  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  } else if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  const where = search
    ? {
        [Op.or]: [{ editorial: { [Op.iLike]: `%${search}%` } }],
      }
    : {};

  const items = await EditorialModel.count({
    where,
  });

  if (items === 0) {
    return {
      response: "No se encontraron noticias",
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

  const result = await EditorialModel.findAll({
    where,
    limit,
    offset,
    distinct: true,
    order: [["createdAt", "DESC"]],
  });

  return {
    response: "Editoriales obtenidas exitosamente",
    result: paginationResponseDTO({
      page,
      pages,
      items,
      next:
        page < pages
          ? `/editorials?page=${page + 1}&items=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/editorials?page=${page - 1}&items=${limit}&search=${search}`
          : null,
      result: result.map(editorialResponseDTO),
    }),
  };
};

export const getAllEditorialsService = async () => {
    return await EditorialModel.findAll();
}

export const getEditorialByIdService = async (id) => {
  return await EditorialModel.findByPk(id);
};

export const createEditorialService = async (editorial) => {
  const existingEditorial = await findOne({
    where: {
      editorial: { [Op.iLike]: editorial },
    },
  });

  if (existingEditorial) {
    throw new Error("Editorial ya existe");
  }

  return EditorialModel.create({
    editorial: editorial.editorial,
  });
};

export const updateEditorialService = async (id, editorial) => {
    const editorialSelected = EditorialModel.findByPk(id);

    if(!editorialSelected) {
        throw new Error('Editorial no encontrada');
    }

    return editorialSelected.update({
        editorial: editorial || editorialSelected.editorial
    })
}
