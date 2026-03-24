import { GenreModel } from "../../config/dbSequelize.js";

export const getAllGenresService = async () => {
    return await GenreModel.findAll({
        order: [['name', 'ASC']]
    });
};

export const getGenreByIdService = async (id) => {
    return await GenreModel.findByPk(id);
}