import {
  sequelize,
  AuthorModel,
  BookModel,
  CopyModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  CopyStatusModel,
  SubjectModel
} from "../../config/dbSequelize.js";
import { createEditionDTO, updateEditionDTO } from "./edition.dto.js";
import { paginationResponseDTO } from "../../shared/paginationResponse.js";
import { editionResponseDTO, editionForBookResponseDTO } from "./edition.dto.js";
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
      attributes: ["idBook", "title", "genreId"],
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
        },
      ],
    },
    {
      model: EditorialModel,
      as: "editorial",
      attributes: ["idEditorial", "name"],
      required: false,
    },
  ];

  const where = {};

  if (search && search.trim() !== "") {
    where[Op.or] = [
      { isbn: { [Op.iLike]: `%${search}%` } },
      { "$book.title$": { [Op.iLike]: `%${search}%` } },
      { "$editorial.name$": { [Op.iLike]: `%${search}%` } },
      { "$book.authors.name$": { [Op.iLike]: `%${search}%` } },
      { "$book.genre.name$": { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (id_editorial > 0) {
    where.editorialId = id_editorial;
  }

  if (id_genre > 0) {
    where["$book.genre_id$"] = id_genre;
  }

  const items = await EditionModel.count({
    where,
    include,
    distinct: true,
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
    subQuery: false,
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
            model: GenreModel,
            as: "genre",
          },
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
        include: [
          {
            model: CopyStatusModel,
            as: 'status',
            attributes: ['idStatus', 'name']
          }
        ]
      },
    ],
  });
// console.log("edition by id en service para admin: ", editionForBookResponseDTO(edition));
 
//   return editionForBookResponseDTO(edition);
};

export const getEditionByBookIdService = async (idBook) => {
  const edition = await EditionModel.findOne({
    where: { bookId: idBook },
  });

  if(!edition) {
    const error = new Error("No existe edición para el libro");
    error.status = 404;
    throw error;
  }
  console.log("edition by book id en service para admin: ", editionResponseDTO(edition));
  return editionResponseDTO(edition);
};

export const createEditionService = async (editionData) => {
  //const dtoEdition = createEditionDTO(editionData);

  const editionCreated = await EditionModel.create(editionData);

  const edition = await EditionModel.findByPk(editionCreated.idEdition, {
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

  return edition;
};

export const updateEditionService = async (id, editionData) => {
  const transaction = await sequelize.transaction();

  try {
    const searchedEdition = await EditionModel.findByPk(id, { transaction });

    if (!searchedEdition) {
      await transaction.rollback();
      return null;
    }

    const editionDto = updateEditionDTO(editionData);

    await searchedEdition.update(editionDto, { transaction });

    await transaction.commit();
    const updatedEdition = await EditionModel.findByPk(id, {
      include: [
        {
          model: BookModel,
          as: "book",
          include: [{ model: GenreModel, as: "genre" }],
        },
        { model: EditorialModel, as: "editorial" },
      ],
    });

    return editionResponseDTO(updatedEdition);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteEditionWithImageService = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const edition = await EditionModel.findByPk(id);
    const copyEdition = await CopyModel.count({ where: { editionId: id } });

    if (!edition) {
      await transaction.rollback();
      const error = new Error("Edición no existe");
      error.status = 404;
      throw error;
    }

    if (copyEdition > 0) {
       await transaction.rollback();
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
     if (transaction.finished !== 'commit' && transaction.finished !== 'rollback') {
      await transaction.rollback();
    }
    throw error;
  }
};
