import { BookModel, GenreModel } from "../../config/dbSequelize.js";

export const getAllBooksService = () => {
    return BookModel.findAll({
        include: [{
            model: GenreModel
        }]
    });
}

export const getBookByIdService = (id) => {
    return BookModel.findByPk(id);
}