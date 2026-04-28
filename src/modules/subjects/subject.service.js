import { Op } from "sequelize";
import { BookSubjectModel, SubjectModel } from "../../config/dbSequelize.js";
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

export const updateSubjectService = async(id, name) => {
  const selectedSubject = await SubjectModel.findByPk(id);
  
    if (!selectedSubject) {
      throw new Error('Descriptor no encontrado');
    };
  
    const existsSubject = await AuthorModel.findOne({
      where: {
        name: name,
        id: { [Op.ne]: id }
      }
    });
  
    if(existsSubject) {
      throw new Error('Descriptor ya existe en otro registro');
    };
  
    return await selectedSubject.update({name});
};

export const deleteSubjectService = async (id) => {
  const selectedSubject = await SubjectModel.findByPk(id);

  if (!selectedSubject) {
    throw new Error('Descriptor no encontrado');
  };

  const bookSubject = await BookSubjectModel.findOne({
    where: {
      subjectId: id,
      attributes: ['subjectId']
    }
  });

  if (bookSubject) {
    throw new Error('No puede eliminar un descriptor asignado a un libro existente');
  };

  await selectedSubject.destroy();

  return true;
};

