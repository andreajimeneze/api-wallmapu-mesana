import {
  sequelize,
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
import {
  deleteImageCloud,
  extractPublicId,
} from "../../services/images/cloudinary.service.js";

export const getAllEditionPaginationService = async ({
  page,
  limit,
  search,
  id_author,
  id_genre,
  id_editorial,
}) => {

  id_author = Number(id_author) || 0;
  id_genre = Number(id_genre) || 0;
  id_editorial = Number(id_editorial) || 0;

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
      model: BookModel,
      as: "book",
      attributes: ["idBook", "title", 'genreId'],
      required: true,
      include: [
        {
          model: GenreModel,
          as: "genre",
          attributes: ["idGenre", "name"],
        },
        {
          model: AuthorModel,
          as: "authors",
          attributes: ["id_author", "name"],
          required: id_author > 0,
          where: id_author > 0 ? { idAuthor: id_author } : undefined,
        }
      ],
    },
    {
      model: EditorialModel,
      as: "editorial",
      attributes: ["idEditorial", "name"],
      required: false
    }
  ];

  const where = {};

  if (search && search.trim() !== "") {
    where[Op.or] = [
      { isbn: { [Op.iLike]: `%${search}%` } },
      { "$book.title$": { [Op.iLike]: `%${search}%` } },
      { "$editorial.name$": { [Op.iLike]: `%${search}%` } },
      { "$book.authors.name$": { [Op.iLike]: `%${search}%` } },
      //sequelize.literal(`EXISTS (SELECT 1 FROM wm_genres WHERE wm_genres.id_genre = "book"."genre_id" AND wm_genres.name ILIKE '%${search}%')`),
      { "$book.genre.name$": { [Op.iLike]: `%${search}%` } },

    ];
  }

  if (id_editorial > 0) {
    where.editorialId = id_editorial;
  };

  if (id_genre > 0) {
    where["$book.genre_id$"] = id_genre;
  };

  const items = await EditionModel.count({
    where,
    include,
    distinct: true,
    //subQuery: false,
    col: "id_edition",
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
    include,
    subQuery: false
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
        include: [
          {
            model: AuthorModel,
            as: "authors",
          },
          {
            model: SubjectModel,
            as: "subjects",
          },
        ],
      },
      {
        model: EditorialModel,
        as: "editorial",
      },
      {
        model: CopyModel,
        as: "copies",
      },
    ],
  });
};

export const getEditionByBookIdService = async (idBook) => {
  return EditionModel.findOne({
    where: { bookId: idBook },
  });
};

export const createEditionService = async (editionData) => {
  const dtoEdition = createEditionDTO(editionData);
  console.log("dto edition service: ", dtoEdition);

  return await EditionModel.create(dtoEdition);
};

export const updateEditionService = async (id, editionData) => {
  const searchedEdition = await EditionModel.findByPk(id);

  if (!searchedEdition) {
    throw new Error("Edición no existe");
  }

  const oldImage = searchedEdition.coverImage;

  const { removeImage = false, isNewImage = false } = editionData;

  const editionDto = updateEditionDTO(editionData);

  if (removeImage) {
    if (oldImage && oldImage.trim() !== "") {
      const publicId = extractPublicId(oldImage);
      if (publicId) {
        await deleteImageCloud(publicId);
      }
    }
    editionDto.coverImage = null;
  }

  if (isNewImage) {
    if (oldImage && oldImage.trim() !== "") {
      const publicId = extractPublicId(oldImage);
      if (publicId) {
        await deleteImageCloud(publicId);
      }
    }
  }
  return await searchedEdition.update(editionDto);
};

export const deleteEditionWithImageService = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const edition = await EditionModel.findByPk(id);
    const copyEdition = await CopyModel.count({ where: { editionId: id } });
    console.log("edición en edition service: ", edition);
    if (!edition) {
      const error = new Error("Edición no existe");
      error.status = 404;
      throw error;
    }

    if (copyEdition > 0) {
      const error = new Error(
        `Edición ${edition.edition} tiene copias asociadas. Debe eliminar las copias primero`,
      );
      error.status = 409;
      throw error;
    }

    const coverImage = edition.coverImage;

    await edition.destroy();
    await transaction.commit();

    if (coverImage && coverImage.trim() !== "") {
      const publicId = extractPublicId(coverImage);
      await deleteImageCloud(publicId);
    }
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
