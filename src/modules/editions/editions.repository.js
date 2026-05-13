import { EditionModel, BookModel, EditorialModel, GenreModel, AuthorModel, CopyModel, CopyStatusModel } from "../../config/dbSequelize.js";

export const getAllEditionPaginationRepository = async ({page, limit, search, filter}) => {
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

  if (idEditorial > 0) {
    where.editorialId = idEditorial;
  }

  if (idGenre > 0) {
    where["$book.genre_id$"] = idGenre;
  }

  const offset = (page - 1) * limit;

  const items = await EditionModel.count({where});
  const result = await EditionModel.findAll({
    where,
    include,
    limit,
    offset,
    distinct: true,
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
  

export const findEditionByBookIdRepository = async (idBook) => {
  return await EditionModel.findOne({
    where: { bookId: idBook },
    attributes: ['bookId']
  });
};

export const createEditionRepository = async (editionData) => {

  const editionCreated = await EditionModel.create(editionData);

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

export const updateEditionRepository = async (id, editionData) => {
    await EditionModel.update(editionData, {
        where: {
            idEdition: id
        }
    });
    return EditionModel.findByPk(id);
};

export const deleteEditionRepository = async (id) => {
  await EditionModel.destroy({
    where: {
        idEdition: id
    }
  })
  return true;
};
