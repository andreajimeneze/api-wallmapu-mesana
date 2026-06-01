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
                Sequelize.literal(`(
                    SELECT COUNT(id_edition) 
                    FROM wm_editions e 
                    WHERE e.book_id = "Book"."id_book"
                    )`),
                "edition_count"
            ],
            [
                Sequelize.literal(`(
                    SELECT COUNT(id_copy)
                    FROM wm_copies c
                    INNER JOIN wm_editions e
                    ON e.id_edition = c.edition_id
                    WHERE e.book_id = "Book"."id_book"
                    )`),
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
                ],
                required: false
            }
        ],

    
        distinct: true,
        subQuery: false,

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
    const [count, [updatedBook]] = await BookModel.update(data, {
        where: {
            idBook: id
        }, ...options, returning: true
    });
    return updatedBook;
};
export const deleteBookRepository = async (id, options = {}) => {
    return await BookModel.destroy({
        where: {
            idBook: id
        }, ...options
    });
};
