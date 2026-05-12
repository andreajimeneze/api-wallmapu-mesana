import { Op } from "sequelize";
import { BookSubjectModel, SubjectModel } from "../../config/dbSequelize.js";
import { createSubjectDTO, subjectResponseDTO } from "./subject.dto.js";
import { createSubjectRepository, deleteSubjectRepository, findAllSubjectsRepository, findSubjectByIdRepository, findSubjectByNameRepository, getAllSubjectsPaginationRepository, updateSubjectRepository } from "./subjects.repository.js";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../../core/responses/paginationResponse.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";
import { findBookSubjectBySubjectIdRepository } from "../book_subjects/book_subject.respository.js";

export const getAllSubjectsPaginationService = async(params) => {

  const { page, limit, search } = paginationRequestDTO(params);
  
  const { page: normalizedPage, limit: normalizedLimit } = normalizePagination(page, limit);

  const { count: items, rows: result } = await getAllSubjectsPaginationRepository({page: normalizedPage, limit: normalizedLimit, search});

  const pages = Math.ceil(items / normalizedLimit);

  const urlResponse = paginationUrl('pagination', normalizedPage, pages, normalizedLimit, search);

  if (items === 0) {
      return emptyPaginationDTO({ page: normalizedPage, pages, items, urlResponse })
    }
    
  
    const haveSearch = search && search.trim() !== "";

    let currentPage = normalizedPage;
  
    if (currentPage > pages && currentPage > 0) {
      currentPage = haveSearch ? 1 : pages;
    } else if (currentPage < 1) {
      currentPage = 1;
    }
  
    return {
      response: "Descriptores obtenidos exitosamente",
      data: paginationResponseDTO({
        page: currentPage,
        pages,
        items,
        urlResponse,
        data: result.map(subjectResponseDTO),
      }),
    };
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

export const updateSubjectService = async(data) => {
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

