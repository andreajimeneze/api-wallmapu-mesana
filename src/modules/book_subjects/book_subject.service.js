import { sequelize } from "../../config/dbSequelize.js";
import { deleteBookSubjectRepository, bulkCreateBookSubjectRepository, deleteBookSubjectByIdBookRepository } from "./book_subject.respository.js";

// export const getBookSubjectsByIdService = async (id) => {
//   return await findOneRepository({
//     where: { idBook: id },
//   });
// };

export const createBookSubjectsService = async (
  idBook,
  subjects = [],
  options = {},
) => {
  const bookSubjects = subjects.map((idSubject) => ({
    idBook,
    idSubject,
  }));

  return await bulkCreateBookSubjectRepository(bookSubjects, options);
};

export const updateBookSubjectService = async (idBook, subjects = [], options = {}) => {
  const transaction = await sequelize.transaction();
  try {
    await deleteBookSubjectByIdBookRepository(idBook, { transaction });

    const bookSubject = subjects.map((idSubject) => ({
      idBook,
      idSubject
    }));

    await bulkCreateBookSubjectRepository(bookSubject, { transaction });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const deleteBookSubjectService = async (idBook, options = []) => {
    return await deleteBookSubjectRepository(idBook, options);
};

