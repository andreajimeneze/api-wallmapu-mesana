import { literal, Op, Sequelize } from "sequelize";
import { EditionModel, BookModel, EditorialModel, GenreModel, AuthorModel, CopyModel, CopyStatusModel } from "../../config/dbSequelize.js";

export const getAllEditionPaginationRepository = async ({ page, limit, search, filter }) => {
  const { idGenre, idAuthor, idEditorial } = filter;

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
          required: idAuthor > 0,
          where: idAuthor > 0 ? { idAuthor } : undefined,
        },
      ],
    },
    {
      model: EditorialModel,
      as: "editorial",
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

  if (idEditorial > 0) {
    where.editorialId = idEditorial;
  }

  if (idGenre > 0) {
    where["$book.genreId$"] = idGenre;
  }

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
export const findAllEditionsRepository = async () => {
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
        attribute: ['name']
      }
    ]
  });
};

export const findEditionByBookIdDetailRepository = async (idBook) => {
  return await EditionModel.findAll({
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
      }
    ]
  });
};

export const findEditionByBooIdRepository = async (idBook) => {
  return await EditionModel.findOne({
    where: {
      bookId: idBook
    }
  });
};

export const createEditionRepository = async (editionData, options = {}) => {

  const editionCreated = await EditionModel.create(editionData, options);

  return await EditionModel.findByPk(
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
};

export const updateEditionRepository = async (id, editionData, options = {}) => {
  return await EditionModel.update(editionData, {
    where: {
      idEdition: id
    }, ...options
  });
  //return EditionModel.findByPk(id);
};

export const deleteEditionRepository = async (id, options = {}) => {
  return await EditionModel.destroy({
    where: {
      idEdition: id
    }, ...options
  })
};
