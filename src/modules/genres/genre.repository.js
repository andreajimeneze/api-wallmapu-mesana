import { GenreModel } from "../../config/dbSequelize.js";

export const findAllGenresRepository = async () => {
    return await GenreModel.findAll({
        order: [['name', 'ASC']]
    });
};

export const findGenreByIdRepository = async (id) => {
    return await GenreModel.findByPk(id);
}