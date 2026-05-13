import { Op } from "sequelize";
import { authorResponseDTO, createAuthorDTO, updateAuthorDTO } from "./author.dto.js";
import { getAllAuthorsPaginationRepository, findAllAuthorsOrderByNameRepository, findAuthorByIdRepository, createAuthorRepository, updateAuthorRepository, deleteAuthorRepository } from "./author.repository.js";
import { findOneBookAuthorRepository } from "../book_authors/book_author.repository.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationRequestDTO, paginationResponseDTO, emptyPaginationDTO } from "../../core/responses/paginationResponse.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";

export const getAllAuthorsPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllAuthorsPaginationRepository, authorResponseDTO);
};

export const getAllAuthorsService = async () => {
  return await findAllAuthorsOrderByNameRepository();
};
export const getAuthorByIdService = async (id) => {
  return await findAuthorByIdRepository(id);
};
export const createAuthorService = async (name) => {
  const dto = createAuthorDTO({
    name,
  });
  return createAuthorRepository(dto);
};
export const updateAuthorService = async (data) => {
  return await updateAuthorRepository(data);
};

export const deleteAuthorService = async (id) => {
  const selectedAuthor = await findAuthorByIdRepository(id);

  if (!selectedAuthor) {
    throw new Error('Autor no encontrado');
  };

  const authorBook = await findOneBookAuthorRepository(id);

  if (authorBook) {
    throw new Error('No puede eliminar un autor asignado a un libro existente');
  };

  return await deleteAuthorRepository(id);
};

