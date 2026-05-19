import { Op } from "sequelize";
import { AuthorModel } from "../../config/dbSequelize.js";


export const getAllAuthorsPaginationRepository = async ({ page, limit, search }) => {

    const where = search
        ? {
            [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
        }
        : {};


    const offset = (page - 1) * limit;

    const items = await AuthorModel.count({ where });
    const result = await AuthorModel.findAll({
        where,
        limit,
        offset,
        raw: true,
        order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };

};

export const findAllAuthorsOrderByNameRepository = async () => {
    return await AuthorModel.findAll({
        order: [['created_at', 'ASC']]
    })
};

export const findAuthorByIdRepository = async (id) => {
    return await AuthorModel.findByPk(id);
};

export const findAuthorByNameRepository = async (name) => {
    return await AuthorModel.findOne({
        where: {
            name: {[Op.iLike]: name}
        }
    })
}

export const createAuthorRepository = async (data, options = {}) => {
    return await AuthorModel.create(data, options);
};

export const updateAuthorRepository = async (id, data, options = {}) => {
    const [count, [updatedAuthor]] = await AuthorModel.update(
        { name: data.name },
        { where: { idAuthor: id }, ...options, returning: true }, 
    );

    return updatedAuthor;
};

export const deleteAuthorRepository = async (id,  options = {}) => {
    return await AuthorModel.destroy({
        where: { idAuthor: id }, ...options
    })
};