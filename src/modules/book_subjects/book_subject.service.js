import { BookSubjectModel } from "../../config/dbSequelize.js";

export const getBookSubjectsByIdService = async (id) => {
  return await findOne({
    where: { bookId: id },
  });
};

export const createBookSubjectsService = async (
  idBook,
  subjects = [],
  options = {},
) => {
  const bookSubjects = subjects.map((subjectId) => ({
    bookId: idBook,
    subjectId: subjectId,
  }));

  await BookSubjectModel.bulkCreate(bookSubjects, options);
};

export const deleteBookSubjectService = async (idBook, options = {}) => {
  await BookSubjectModel.destroy({
    where: { bookId: idBook },
    options,
  });

  return true;
};
