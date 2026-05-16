import { Op } from "sequelize";
import { BookSubjectModel, SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO, subjectResponseDTO } from "./subject.dto.js";
import { createSubjectRepository, deleteSubjectRepository, findAllSubjectsRepository, findSubjectByIdRepository, findSubjectByNameRepository, getAllSubjectsPaginationRepository, updateSubjectRepository } from "./subjects.repository.js";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/pagination/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/pagination/paginationUrl.js";
import { findOneBookSubjectBySubjectIdRepository } from "../book_subjects/book_subject.respository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { conflictError, notFoundError } from "../../core/helpers/errors/errors.js";

export const getAllSubjectsPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllSubjectsPaginationRepository, subjectResponseDTO);
};
export const getAllSubjectsService = async () => {
  return await findAllSubjectsRepository();
};

export const getSubjectByIdService = async (id) => {
  const searched = await findSubjectByIdRepository(id);
  if(!searched) throw notFoundError();
  return searched;
};

export const createSubjectService = async (name, options = {}) => {
  const normalizeName = name.trim();
  const subject = await findSubjectByNameRepository(normalizeName);
  if(subject) throw conflictError('Subject ya se encuentra registrado');
 
  return await createSubjectRepository({name: normalizeName}, options);
};

export const updateSubjectService = async (id, subjectData, options = {}) => {
  const {idSubject, name} = subjectData;
  const currentId = Number(id);
  const subject = await findSubjectByIdRepository(currentId);
  if(!subject) throw notFoundError();
  const duplicate = await findSubjectByNameRepository(name);
  if(duplicate && duplicate.idSubject === currentId) throw conflictError('Descriptor ya existe no puede usar el mismo nombre');

  return await updateSubjectRepository(currentId, {name}, options);
};

export const deleteSubjectService = async (id, options = {}) => {
  const selectedSubject = await findSubjectByIdRepository(id);
  if (!selectedSubject) throw notFoundError();

  const bookSubject = await findOneBookSubjectBySubjectIdRepository(id);
  if (bookSubject) throw conflictError('No puede eliminar un descriptor asignado a un libro existente');

  await deleteSubjectRepository(id, options);
  return true;
};

