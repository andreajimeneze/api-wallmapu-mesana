import { Op } from "sequelize";
import { authorResponseDTO } from "./author.dto.js";
import { getAllAuthorsPaginationRepository, findAllAuthorsOrderByNameRepository, findAuthorByIdRepository, createAuthorRepository, updateAuthorRepository, deleteAuthorRepository, findAuthorByNameRepository } from "./author.repository.js";
import { findOneBookAuthorByIdAuthorRepository } from "../book_authors/book_author.repository.js";
import { normalizePagination } from "../../core/helpers/pagination/nomalizePagination.js";
import { paginationRequestDTO, paginationResponseDTO, emptyPaginationDTO } from "../../core/responses/paginationResponse.js";
import { paginationUrl } from "../../core/helpers/pagination/paginationUrl.js";
import { getAllPaginationService } from "../../core/services/basePagination.service.js";
import { conflictError, notFoundError } from "../../core/helpers/errors/errors.js";

export const getAllAuthorsPaginationService = async (params) => {
  return await getAllPaginationService(params, getAllAuthorsPaginationRepository, authorResponseDTO);
};

export const getAllAuthorsService = async () => {
  return await findAllAuthorsOrderByNameRepository();
};
export const getAuthorByIdService = async (idAuthor) => {
  const author = await findAuthorByIdRepository(idAuthor);
  if(!author) throw notFoundError();
  return author;
};
export const createAuthorService = async (name, options = {}) => {
  const normalizeName = name.trim();
  const author = await findAuthorByNameRepository(normalizeName);
  if(author) throw conflictError("Author ya se encuentra registrado");

  return createAuthorRepository({name: normalizeName}, options);
};
export const updateAuthorService = async (id, authorData, options = {}) => {
  const { idAuthor, name } = authorData;
  const currentId = Number(id);

  if(idAuthor && idAuthor !== currentId) throw conflictError(`Id de ruta ${currentId} no coincide con el id del body ${idAuthor}`)
  const author = await findAuthorByIdRepository(currentId);
  if(!author) throw notFoundError();
  
  const duplicate = await findAuthorByNameRepository(name);
 if(duplicate && duplicate.idAuthor !== currentId) throw conflictError('Autor ya existe no puede usar el mismo nombre');

  return await updateAuthorRepository(currentId, {name}, options);
};

export const deleteAuthorService = async (idAuthor, options = {}) => {
  const author = await findAuthorByIdRepository(idAuthor);
  if (!author) throw notFoundError();
  const authorBook = await findOneBookAuthorByIdAuthorRepository(idAuthor);
  if (authorBook) throw conflictError('No puede eliminar un autor asignado a un libro existente');
  await deleteAuthorRepository(idAuthor, options);
  return true;
};

