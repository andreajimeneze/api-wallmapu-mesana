import { SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO } from "./subject.dto.js";

export const getAllSubjectsService = async () => {
  return await SubjectModel.findAll({
    order: [['name', 'ASC']]
  });
};

export const getSubjectByIdService = async (id) => {
  return await SubjectModel.findByPk(id);
};

export const createSubjectService = async (id, options = {}) => {

  const exists = await SubjectModel.findByPk(id);

  if (exists) {
    throw new Error("Descriptor ya existe");
  }

  const subjectDto = createSubjectDTO({ name });
  

  return await SubjectModel.create(subjectDto);
};

