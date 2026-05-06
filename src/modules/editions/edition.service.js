import {
  sequelize,
  AuthorModel,
  BookModel,
  CopyModel,
  EditionModel,
  EditorialModel,
  GenreModel,
  CopyStatusModel,
} from "../../config/dbSequelize.js";
import { editionForBookResponseDTO, updateEditionDTO } from "./edition.dto.js";
import { paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { editionResponseDTO } from "./edition.dto.js";
import { Op } from "sequelize";
import {
  deleteImageCloud,
  extractPublicId,
} from "../../core/lib/cloudinary.service.js";
import { createPaginationService } from "../../core/services/basePagination.service.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";

export const getAllEditionPaginationService = async (params, id_author, id_genre, id_editorial) => {
  const { page, limit, search, filter } = paginationRequestDTO(params);

  id_author = Number(id_author) || 0;
  id_genre = Number(id_genre) || 0;
  id_editorial = Number(id_editorial) || 0;

  normalizePagination(page, limit);

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
        },
        {
          model: AuthorModel,
          as: "authors",
          required: id_author > 0,
          where: id_author > 0 ? { idAuthor: id_author } : undefined,
        },
      ],
    },
    {
      model: EditorialModel,
      as: "editorial",
      required: false,
    },
    {
      model: CopyModel,
      as: 'copies',
      required: false,
      include: [
        {
          model: CopyStatusModel,
          as: 'status'
        }
      ]
    }
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

  const offset = (page - 1) * limit;

  const { count: items, rows: result } = await EditionModel.findAndCountAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
  });

  if (items === 0) {
    return emptyPaginationDTO({ page, pages, items, next, prev, data });
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
    data: paginationResponseDTO({
      page,
      pages,
      items,
      urlResponse,
      data: result.map(editionForBookResponseDTO),
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
        attributes: ['idEditorial', 'name']
      },
      {
        model: CopyModel,
        as: 'copies',
        required: true,
        attributes: ['idCopy', 'barcode', 'copyNumber', 'signatureTopography', 'createdAt']
      }
    ],
  });
};

export const getEditionByIdService = async (id) => {
  return await EditionModel.findOne({
    where: {
      idEdition: id
    },
    include: [
      {
        model: BookModel,
        as: "book",
        //required: true,
        attributes: ['idBook', 'title']
      },
      {
        model: EditorialModel,
        as: "editorial",
        //required: true,
        attribute: ['name']
      }
    ],
  }
  );
};

// export const getEditionByBookIdService = async (idBook) => {
//   const edition = await EditionModel.findOne({
//     where: { bookId: idBook },
//   });

//   if(!edition) {
//     const error = new Error("No existe edición para el libro");
//     error.status = 404;
//     throw error;
//   }

//   return editionResponseDTO(edition);
// };

export const createEditionService = async (editionData) => {

  const editionCreated = await EditionModel.create(editionData);

  const edition = await EditionModel.findByPk(
    editionCreated.idEdition,
    {
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
    }
  );

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

    return updatedEdition;
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
      const error = new Error("Edición no encontrada");
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

    if (coverImage && coverImage.trim() !== "") {
      const publicId = extractPublicId(coverImage);

      await deleteImageCloud(publicId);
    }
    await edition.destroy();
    await transaction.commit();
    return true;
  } catch (error) {
    if (transaction.finished !== 'commit' && transaction.finished !== 'rollback') {
      await transaction.rollback();
    }
    throw error;
  }
};
