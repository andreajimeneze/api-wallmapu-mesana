import { Op } from "sequelize";
import { SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO } from "./subject.dto.js";

export const getAllSubjectsService = async () => {
  return await SubjectModel.findAll();
};

export const getSubjectByIdService = async (id) => {
  return await SubjectModel.findByPk(id);
};

// export const getSubjectByNameService = async (name, options = {}) => {
//   return await SubjectModel.findOne({
//     where: { name: { [Op.iLike]: name.trim() } },
//     ...options
//   });
// };

export const createSubjectService = async (id, options = {}) => {
  //const normalizedName = name.trim();
  // const exists = await SubjectModel.findOne({
  //   where: { name: { [Op.iLike]: normalizedName } },
  //   ...options,
  // });

  const exists = await SubjectModel.findByPk(id);

  if (exists) {
    throw new Error("Descriptor ya existe");
  }

  const subjectDto = createSubjectDTO({ name });
  

  return await SubjectModel.create(subjectDto);
};

// export const getOrCreateSubjectService = async (subjectIds, options = {}) => {
//   //const subjectIds = [];
//   for (const id of subjectIds) {
//     let subject = await getSubjectByIdService(id, options);

//     if (!subject) {
//       subject = await createSubjectService({ name }, options);
//     }

//     subjectIds.push(subject.idSubject);
//   }
//   return subjectIds;
// };
