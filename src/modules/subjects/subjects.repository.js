import { Op } from "sequelize";
import { BookSubjectModel, SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO } from "./subject.dto.js";

export const getAllSubjectsPaginationRepository = async ({ page, limit, search }) => {

  const where = search
    ? {
      [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }],
    }
    : {};


  const offset = (page - 1) * limit;

  const items = await SubjectModel.count({ where });
  const result = await SubjectModel.findAll({
    where,
    limit,
    offset,
    raw: true,
    order: [['updated_at', 'DESC']]
  });

  return { count: items, rows: result };

};

export const findAllSubjectsRepository = async () => {
  return await SubjectModel.findAll({
    order: [['name', 'ASC']]
  });
};

export const findSubjectByIdRepository = async (id) => {
  return await SubjectModel.findByPk(id);
};

export const findSubjectByNameRepository = async (name) => {
  return await SubjectModel.findOne({
    where: {
      name: { [Op.iLike]: name }
    }
  });
};

export const createSubjectRepository = async (name, options = {}) => {

  return await SubjectModel.create(name, options);
};

export const updateSubjectRepository = async (id, data, options = {}) => {

  const [count, [updatedSubject]] = await SubjectModel.update(
    { name: data },
    {
      where: { idSubject: id },
      ...options, returning: true
    });
    if(count === 0) return null;
    return updatedSubject;
};

export const deleteSubjectRepository = async (id, options = {}) => {
  return await SubjectModel.destroy({
    where: {
      idSubject: id
    }, ...options
  });
};

