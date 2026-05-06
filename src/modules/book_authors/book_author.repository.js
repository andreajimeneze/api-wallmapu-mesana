import { BookAuthorModel } from "../../config/dbSequelize.js";

export const findAllBookAuthorRepository = async () => {
    return await BookAuthorModel.findAll();
};

export const findBookAuthorByIdRepository = async (id) => {
    return await BookAuthorModel.findByPk(id);
};

export const findOneBookAuthorRepository = async (id) => {
    return await BookAuthorModel.findOne({
        where: {
            idAuthor: id
        }
    })
}

export const bulkCreateBookAuthorRepository = async (data, options = {}) => {
    return await BookAuthorModel.bulkCreate(data, options);
};

export const updateBookAuthorRepository = async(idBook, authors = []) => {
    await BookAuthorModel.destroy({
        where: {
            idBook: idBook
        }
    });

    const bookAuthor = authors.map((idAuthor) => ({
        idBook,
        idAuthor
    }));

    return BookAuthorModel.bulkCreate(bookAuthor);
};

export const deleteBookAuthorRepository = async (idBook, idAuthor) => {
   await BookAuthorModel.destroy({
        where: {
            idBook: idBook,
            idAuthor: idAuthor
        }
    });
    
    return true;
};

