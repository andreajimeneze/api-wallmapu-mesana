import { BookSubjectModel } from "../../config/dbSequelize.js";

export const getBookSubjectsByIdService = async (id) => {
  return await findOne({
    where: { idBook: id },
  });
};

export const createBookSubjectsService = async (
  idBook,
  subjects = [],
  options = {},
) => {
  const bookSubjects = subjects.map((idSubject) => ({
    idBook,
    idSubject,
  }));

  await BookSubjectModel.bulkCreate(bookSubjects, options);
};

export const deleteBookSubjectService = async (idBook, transaction = null) => {
  await BookSubjectModel.destroy({
    where: { idBook },
      ...(transaction && { transaction })
  });

  return true;
};
