import { BookSubjectModel } from "../../config/dbSequelize.js";

export const findOneBookSubjectBySubjectIdRepository = async (idSubject) => {
    return await BookSubjectModel.findOne({
        where: { idSubject: idSubject }
    });
};

export const bulkCreateBookSubjectRepository = async (data, options = {}) => {
    return await BookSubjectModel.bulkCreate(data, options);
};

export const deleteBookSubjectRepository = async (idBook, idSubject, options = {}) => {
    return await BookSubjectModel.destroy({
        where: {
            idBook: idBook,
            idSubject: idSubject
        }, ...options
    });
};

export const deleteBookSubjectByIdBookRepository = async (idBook, options = {}) => {
    return await BookSubjectModel.destroy({
        where: {
            idBook: idBook
        },
        ...options
    });
};