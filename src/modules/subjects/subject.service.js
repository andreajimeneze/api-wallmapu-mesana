import { Op } from "sequelize";
import { SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO } from "./subject.dto.js";

export const getAllSubjectsService = async () => {
  return await SubjectModel.findAll();
};

export const getSubjectByIdService = async (id) => {
  return await SubjectModel.findByPk(id);
};

export const getSubjectByNameService = async (name) => {
  return await SubjectModel.findOne({
    where: { name: { [Op.iLike]: name.trim() } },
  });
};

export const createSubjectService = async (subjectData) => {
  const exists = await SubjectModel.findOne({
    where: { name: { [Op.iLike]: name.trim() } },
  });

  if (exists) {
    throw new Error("Descriptor ya existe");
  }

  const subjectDto = createSubjectDTO({
    name,
  });

  return await SubjectModel.create(subjectDto);
};
