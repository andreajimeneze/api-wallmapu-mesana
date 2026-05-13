import { Op } from "sequelize";
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

export const getBookPaginationRepository = async ({ page, limit, search }) => {

    const include = [
        {
            model: GenreModel,
            as: "genre",
            required: false,
        },
        {
            model: AuthorModel,
            as: "authors",
            through: { attributes: [] },
        },
        {
            model: SubjectModel,
            as: "subjects",
            through: { attributes: [] },
        },
        {
            model: EditionModel,
            as: "editions",
            include: [
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
                            as: "status",
                        },
                    ],
                },
            ],
        },
    ];

    const where = {};
    if (search) {
        where[Op.or] = [
            { title: { [Op.iLike]: `%${search}%` } }
        ]
    }

    const offset = (page - 1) * limit;

    const items = await BookModel.count({ where });
    const result = await BookModel.findAll({
        where,
        include,
        limit,
        offset,
        distinct: true,
        order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };
};

// export const findAllBooksRepository = async() => {
//     return await BookModel.findAll();
// };

export const findBookByIdRepository = async (id) => {
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

export const findBookByTitleRepository = async (title) => {
    return await BookModel.findOne({
        where: { title: { [Op.iLike]: title.trim() } }
    });
};

export const createBookRepository = async (data, options = {}) => {
    return await BookModel.create(data, { options });
};

export const updateBookRepository = async (idBook, data) => {
    return await BookModel.update(data, {
        where: {
            idBook: idBook
        }
    });
};

export const deleteBookRepository = async (idBook) => {
    await BookModel.destroy({
        where: {
            idBook: idBook
        }
    });
    return true;
};
