//import { BookSubjectModel } from "../../config/dbSequelize.js";

import { deleteBookSubjectRepository, bulkCreateBookSubjectRepository, updateBookSubjectRepository } from "./book_subject.respository.js";

export const getBookSubjectsByIdService = async (id) => {
  return await findOneRepository({
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

  return await bulkCreateBookSubjectRepository(bookSubjects, options);
};

export const updateBookSubjectService = async(idBook, subjects = []) => {
  return await updateBookSubjectRepository(idBook, subjects);
};

export const deleteBookSubjectService = async (idBook, options = []) => {
  try {
      return await deleteBookSubjectRepository(
    idBook, options
  );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
