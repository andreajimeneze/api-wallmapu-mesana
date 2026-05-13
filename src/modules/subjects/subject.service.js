import { Op } from "sequelize";
import { BookSubjectModel, SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO, subjectResponseDTO } from "./subject.dto.js";
import { createSubjectRepository, deleteSubjectRepository, findAllSubjectsRepository, findSubjectByIdRepository, findSubjectByNameRepository, getAllSubjectsPaginationRepository, updateSubjectRepository } from "./subjects.repository.js";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";
import { findBookSubjectBySubjectIdRepository } from "../book_subjects/book_subject.respository.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";

export const getAllSubjectsPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllSubjectsPaginationRepository, subjectResponseDTO);
};
export const getAllSubjectsService = async () => {
  return await findAllSubjectsRepository();
};

export const getSubjectByIdService = async (id) => {
  return await findSubjectByIdRepository(id);
};

export const createSubjectService = async (name, options = {}) => {
  const subjectDto = createSubjectDTO({ name });
  return await createSubjectRepository(subjectDto);
};

export const updateSubjectService = async (data) => {
  return await updateSubjectRepository(data);
};

export const deleteSubjectService = async (id) => {
  const selectedSubject = await findSubjectByIdRepository(id);

  if (!selectedSubject) {
    throw new Error('Descriptor no encontrado');
  };

  const bookSubject = await findBookSubjectBySubjectIdRepository(id);

  if (bookSubject) {
    throw new Error('No puede eliminar un descriptor asignado a un libro existente');
  };

  await deleteSubjectRepository(id);
};

