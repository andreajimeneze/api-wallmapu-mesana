import {
  AuthorModel,
  BookModel,
  CopyModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  SubjectModel,
} from "../../config/dbSequelize.js";
import { createEditionDTO, updateEditionDTO } from "./edition.dto.js";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
import { Op } from "sequelize";
import { getCopyByIdService } from "../copies/copy.service.js";

export const getAllEditionPaginationService = async ({
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
          { isbn: { [Op.iLike]: `%${search}%` } },
          { "$book.title$": { [Op.iLike]: `%${search}%` } },
          { "$book.genre.name$": { [Op.iLike]: `%${search}%` } },
          { "$editorial.name$": { [Op.iLike]: `%${search}%` } },
          { "$book.authors.name$": { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const items = await EditionModel.count({
    where,
  });

  if (items === 0) {
    return {
      response: "No se encontraron ediciones",
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

  const result = await EditionModel.findAll({
    where,
    limit,
    offset,
    distinct: true,
    order: [
      ["created_at", "DESC"],
      [{ model: BookModel, as: "book" }, "idBook", "ASC"],
    ],
    include: [
      {
        model: BookModel,
        as: "book",
        attributes: ["idBook", "title"],
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
            throught: { attributes: [] },
          },
          {
            model: SubjectModel,
            as: 'subjects',
            attributes: ['idSubject', 'name'],
            throught: { attributes: []}
          }
        ],
      },
      {
        model: EditorialModel,
        as: "editorial",
        attributes: ["idEditorial", "name"],
      },
      {
        model: CopyModel,
        as: "copies",
        attributes: ["idCopy", "signatureTopography", "copyNumber"],
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
          ? `/edition/pagination?page=${page + 1}&limit=${limit}&search=${search}`
          : null,
      prev:
        page > 1
          ? `/edition/pagination?page=${page - 1}&limit=${limit}&search=${search}`
          : null,
      result: result.map(editionResponseDTO),
    }),
  };
};

export const getAllEditionsService = async () => {
  return await EditionModel.findAll({
    include: [
      {
        model: BookModel,
        as: "book",
      },
      {
        model: EditorialModel,
        as: "editorial",
      },
    ],
  });
};

export const getEditionByIdService = async (id) => {
  return await EditionModel.findByPk(id, {
    include: [
      {
        model: BookModel,
        as: "book",
      },
      {
        model: EditorialModel,
        as: "editorial",
      },
    ],
  });
};

export const getEditionByBookIdService = async (idBook) => {
  return EditionModel.findOne({
    where: { bookId: idBook
     },
  });
};

export const createEditionService = async (editionData) => {
  const dtoEdition = createEditionDTO(editionData);
  console.log('dto edition service: ', dtoEdition);

  return await EditionModel.create(dtoEdition);
};

export const updateEditionService = async (id, editionData) => {
  const searchedEdition = await EditionModel.findByPk(id);

  if (!searchedEdition) {
    throw new Error("Edición no existe");
  }

  const editionDto = createEditionDTO(editionData);
  return await EditionModel.update(editionDto);
};

export const deleteEditionWithImageService = async(id) => {
  const edition = await getCopyByIdService(id); 
  const copyEdition = await CopyModel.findOne({where: { editionId: id} });
  
  console.log('Copias de las ediciones', copyEdition);
 

  if(!edition) {
    return new Error('Edición no existe');
  };

  if(copyEdition) {
    return new Error(`Edición ${edition.edition} tiene copias asociadas`);
  }

  //const url = edition.coverImage;

  return await edition.destroy();

  //return url;
}
