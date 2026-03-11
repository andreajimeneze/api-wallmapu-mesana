import { BookSubjectModel } from "../../config/dbSequelize.js";

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
