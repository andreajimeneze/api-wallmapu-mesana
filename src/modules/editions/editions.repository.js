import { literal, Op, Sequelize } from "sequelize";
import { EditionModel, BookModel, EditorialModel, GenreModel, AuthorModel, CopyModel, CopyStatusModel, EditionFormatModel, FormatModel } from "../../config/dbSequelize.js";

export const getAllEditionPaginationRepository = async ({ page, limit, search, filter }) => {
  const { idGenre, idAuthor, idEditorial, idFormat} = filter;

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
           where: idGenre > 0 ? { idGenre } : undefined,
        },
        {
          model: AuthorModel,
          as: "authors",
          attributes: ['idAuthor', 'name'],
          required: idAuthor > 0,
          where: idAuthor > 0 ? { idAuthor } : undefined,
        },
      ],
    },
    {
      model: EditorialModel,
      as: "editorial",
      required: idEditorial > 0, 
      where: idEditorial > 0
      ? { idEditorial } : undefined
    },
    {
      model: FormatModel,
      as: 'formats',
      required: idFormat > 0,
      where: idFormat > 0
      ? {idFormat} : undefined
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

  // if (idEditorial > 0) {
  //   where.editorialId = idEditorial;
  // }

  const offset = (page - 1) * limit;

  const options = {
    where,
    attributes: {
      include: [
        [
          literal(`(
          SELECT COUNT(*)
          FROM wm_copies c
          WHERE c."edition_id" = "Edition"."id_edition"
        )`),
          "copy_count"
        ]
      ]
    },
    include,
    subQuery: false,
    distinct: true,
  }

  const items = await EditionModel.count(options);
  const result = await EditionModel.findAll({
    ...options,
    limit,
    offset,
    order: [['updated_at', "ASC"]]
  });

  return { count: items, rows: result };
};

export const findEditionByIdRepository = async (id) => {
  return await EditionModel.findByPk(id, {
    include: [
      {
        model: BookModel,
        as: "book",
        attributes: ['idBook', 'title']
      },
      {
        model: EditorialModel,
        as: "editorial",
        attributes: ['name']
      },
      {
        model: FormatModel,
        as: 'formats'
      }
    ]
  });
};

export const findEditionByBookIdRepository = async (idBook) => {
  return EditionModel.findOne({
    where: {
      bookId: idBook
    }
  })
};

export const findEditionsByBookIdDetailRepository = async (idBook) => {
  const editions = await EditionModel.findAll({
    where: { bookId: idBook },
    include: [
      {
        model: EditorialModel,
        as: "editorial",
        attributes: ["name"]
      },

      {
        model: BookModel,
        as: "book",
        attributes: ["title"],

        include: [
          {
            model: GenreModel,
            as: "genre",
            attributes: ["name"]
          },
          {
            model: AuthorModel,
            as: 'authors',
            attributes: ['idAuthor', 'name'],
            through: {
              attributes: []
            },
          }
        ]
      },
      {
        model: CopyModel,
        as: 'copies'
      },
      {
        model: FormatModel,
        as: 'formats'
      }
    ]
  });

  return editions.map(edition => ({
  ...edition.toJSON(),
  count_copies: edition.copies?.length ?? 0
  }))
};

export const createEditionRepository = async (editionData, options = {}) => {
  return await EditionModel.create(editionData, options);
};

export const updateEditionRepository = async (id, editionData, options = {}) => {
  const [count, updatedEdition] = await EditionModel.update(editionData, {
    where: {
      idEdition: id
    }, ...options, returning: true
  });
   if (count === 0) return null; 
  return updatedEdition[0];  
};

export const deleteEditionRepository = async (id, options = {}) => {
  return await EditionModel.destroy({
    where: {
      idEdition: id
    }, ...options
  })
};
