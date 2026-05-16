import { Op, Sequelize } from "sequelize";
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

    const where = {};

    if (search) {
        where[Op.or] = [
            {
                title: {
                    [Op.iLike]: `%${search}%`
                }
            }
        ];
    }

    const offset = (page - 1) * limit;

    const items = await BookModel.count({ where });

    const result = await BookModel.findAll({
        where,

        attributes: [
            "id_book",
            "title",
            "genre_id",
            "created_at",
            "updated_at",

            [
                Sequelize.fn(
                    "COUNT",
                    Sequelize.fn(
                        "DISTINCT",
                        Sequelize.col("editions.id_edition")
                    )
                ),
                "edition_count"
            ],

            [
                Sequelize.fn(
                    "COUNT",
                    Sequelize.fn(
                        "DISTINCT",
                        Sequelize.col("editions->copies.id_copy")
                    )
                ),
                "copy_count"
            ],
        ],

        include: [
            {
                model: GenreModel,
                as: "genre",
                attributes: [
                    "id_genre",
                    "name"
                ],
            },

            {
                model: AuthorModel,
                as: "authors",
                through: {
                    attributes: []
                },
                attributes: [
                    "id_author",
                    "name"
                ],
            },

            {
                model: EditionModel,
                as: "editions",
                attributes: [
                    "id_edition",
                    "cover_image"
                ],
                required: false,
                order: [['updated_at', 'ASC']],

                include: [
                    {
                        model: CopyModel,
                        as: "copies",
                        order: [['updated_at', 'ASC']],
                        attributes: [],
                        required: false,
                    }
                ]
            }
        ],

        group: [
            "Book.id_book",

            "genre.id_genre",

            "authors.id_author",

            "editions.id_edition",
        ],

        subQuery: false,

        distinct: true,

        limit,
        offset,

        order: [
            ["updated_at", "DESC"]
        ]
    });

    const plainBooks = result.map(book =>
        book.get({ plain: true })
    );

    return {
        count: items,
        rows: plainBooks
    };
};

// export const getBookPaginationRepository = async ({ page, limit, search }) => {

//     const include = [
//         {
//             model: GenreModel,
//             as: "genre",
//             required: false,
//             attributes: ["name"],
//         },
//         {
//             model: AuthorModel,
//             as: "authors",
//             through: { attributes: [] },
//             required: false,
//             attributes: ["id_author", "name"],
//         },
//         {
//             model: SubjectModel,
//             as: "subjects",
//             through: { attributes: [] },
//             required: false,
//         },
//         {
//             model: EditionModel,
//             as: "editions",
//             required: false,
//             attributes: ["id_edition", "cover_image"],

//             include: [
//                 {
//                     model: EditorialModel,
//                     as: "editorial",
//                     required: false,
//                 },
//                 {
//                     model: CopyModel,
//                     as: "copies",
//                     required: false,
//                     attributes: ["id_copy"],

//                     include: [
//                         {
//                             model: CopyStatusModel,
//                             as: "status",
//                             required: false,
//                             attributes: ["id_status", "name"],
//                         },
//                     ],
//                 },
//             ],
//         },
//     ];

//     const where = {};

//     if (search && search.trim() !== "") {
//         where[Op.or] = [
//             { title: { [Op.iLike]: `%${search}%` } }
//         ];
//     }

//     const offset = (page - 1) * limit;

//     const { count, rows } = await BookModel.findAndCountAll({
//         where,
//         include,
//         limit,
//         offset,
//         distinct: true,
//         order: [["updated_at", "DESC"]],
//     });

//     return { count, rows };
// };
// export const getBookPaginationRepository = async ({ page, limit, search }) => {

//     const attributes = [
//         "id_book",
//         "title",

//         [
//             Sequelize.fn(
//                 "COUNT",
//                 Sequelize.fn("DISTINCT", Sequelize.col("editions.id_edition"))
//             ),
//             "edition_count"
//         ],

//         [
//             Sequelize.fn(
//                 "COUNT",
//                 Sequelize.fn("DISTINCT", Sequelize.col("editions->copies.id_copy"))
//             ),
//             "copy_count"
//         ],
//     ];

//     const include = [
//         {
//             model: EditionModel,
//             as: "editions",
//             attributes: [],
//             required: false,

//             include: [
//                 {
//                     model: CopyModel,
//                     as: "copies",
//                     attributes: [],
//                     required: false,
//                 }
//             ]
//         }
//     ];

//     const where = {};
//     if (search) {
//         where[Op.or] = [
//             { title: { [Op.iLike]: `%${search}%` } }
//         ]
//     }

//     const offset = (page - 1) * limit;

//     const items = await BookModel.count({ where });
//     const result = await BookModel.findAll({
//         where,
//         attributes,
//         include,
//         limit,
//         offset,
//         subQuery: false,
//         distinct: true,
//         group: [
//             "Book.id_book",
//             "Book.title",
//         ],
//         order: [['updated_at', 'DESC']]
//     });

//     const plainBooks = result.map(book => book.get({ plain: true }));

//     console.log(plainBooks);

//     return { count: items, rows: plainBooks };
// };

export const findAllBooksRepository = async () => {
    return await BookModel.findAll();
};

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
    return await BookModel.create(data, options);
};

export const updateBookRepository = async (id, data, options = {}) => {
    return await BookModel.update(data, {
        where: {
            idBook: id
        }, ...options
    });
};

export const deleteBookRepository = async (id, options = {}) => {
    return await BookModel.destroy({
        where: {
            idBook: id
        }, ...options
    });
};
