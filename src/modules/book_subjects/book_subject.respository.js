import { BookSubjectModel } from "../../config/dbSequelize.js";

export const findOneRepository = async (id) => {
    return await BookSubjectModel.findOne({
        where: { idBook: id }
    });
};

export const bulkCreateBookSubjectRepository = async (data, options = {}) => {
    return await BookSubjectModel.bulkCreate(data, options);
};

export const updateBookSubjectRepository = async (idBook, subjects = []) => {
    await BookSubjectModel.destroy({
        where: {
            idBook: idBook
        }
    });

     const bookSubject = subjects.map((idSubject) => ({
        idBook,
        idSubject,
  }));

    return await BookSubjectModel.bulkCreate( bookSubject );
};

export const deleteBookSubjectRepository = async (idBook, idSubject) => {
    await BookSubjectModel.destroy({
        where: {
            idBook: idBook,
            idSubject: idSubject
        }
    });

    return true;
};