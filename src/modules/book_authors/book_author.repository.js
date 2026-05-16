import { BookAuthorModel } from "../../config/dbSequelize.js";

export const findOneBookAuthorByIdAuthorRepository = async (id) => {
    return await BookAuthorModel.findOne({
        where: {
            idAuthor: id
        }
    });
};
export const bulkCreateBookAuthorRepository = async (data, options = {}) => {
    return await BookAuthorModel.bulkCreate(data, options);
};

export const deleteBookAuthorRepository = async (idBook, idAuthor, options = {}) => {
   return await BookAuthorModel.destroy({
        where: {
            idBook: idBook,
            idAuthor: idAuthor
        }, ...options
    });
};

export const deleteBookAuthorByIdBookRepository = async (idBook, options = {}) => {
   return await BookAuthorModel.destroy({
        where: {
            idBook: idBook
        },
        ...options
    });
};

