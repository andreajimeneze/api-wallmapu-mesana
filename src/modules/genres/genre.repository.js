import { Op } from "sequelize";
import { GenreModel } from "../../config/dbSequelize.js";


export const getAllGenresPaginationRepository = async ({ page, limit, search }) => {
    const where = search
        ? {
            [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
        }
        : {};

    const offset = (page - 1) * limit;

    const items = await GenreModel.count({ where });
    const result = await GenreModel.findAll({
        where,
        limit,
        offset,
        raw: true,
        order: [['updated_at', 'DESC']]
    });

    return { count: items, rows: result };
};
export const findAllGenresRepository = async () => {
    return await GenreModel.findAll({
        order: [['name', 'ASC']]
    });
};

export const findGenreByIdRepository = async (id) => {
    return await GenreModel.findByPk(id);
};

export const findGenreByNameRepository = async (name) => {
    return await GenreModel.findOne({
        where: {
            name: { [Op.iLike]: name }
        }
    })
}

export const createGenreRepository = async (data, options = {}) => {
    return await GenreModel.create(data, options)
};

export const updateGenreRepository = async (id, data, options = {}) => {

    const [count, [updatedGenre]] =  await GenreModel.update(
        { name: data.name },
        {
            where: {
                idGenre: id
            },
            ...options, returning: true
        }
    );
    if(count === 0) return null;
    return updatedGenre;
};

export const deleteGenreRepository = async (id, options = {}) => {
    return await GenreModel.destroy({
        where: {
            idGenre: id
        }, ...options
    })
}