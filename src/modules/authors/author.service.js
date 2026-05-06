import { Op } from "sequelize";
import { BookAuthorModel } from "../../config/dbSequelize.js";
import { authorResponseDTO, createAuthorDTO, updateAuthorDTO } from "./author.dto.js";
import { getAllAuthorsPaginationRepository, findAllAuthorsOrderByNameRepository, findAuthorByIdRepository, createAuthorRepository, updateAuthorRepository, deleteAuthorRepository } from "./author.repository.js";
import { findOneBookAuthorRepository } from "../book_authors/book_author.repository.js";
import { normalizePagination } from "../../core/helpers/nomalizePagination.js";
import { paginationRequestDTO, paginationResponseDTO, emptyPaginationDTO } from "../../core/responses/paginationResponse.js";
import { paginationUrl } from "../../core/helpers/paginationUrl.js";

export const getAllAuthorsPaginationService = async(params) => {

  const { page, limit, search } = paginationRequestDTO(params);
  
  const { page: normalizedPage, limit: normalizedLimit } = normalizePagination(page, limit);

  const { count: items, rows: result } = await getAllAuthorsPaginationRepository({page: normalizedPage, limit: normalizedLimit, search});

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
      response: "Libros obtenidos exitosamente",
      data: paginationResponseDTO({
        page: currentPage,
        pages,
        items,
        urlResponse,
        data: result.map(authorResponseDTO),
      }),
    };
  };


export const getAllAuthorsService = async () => {
  return await findAllAuthorsOrderByNameRepository();
};

export const getAuthorByIdService = async (id) => {
  return await findAuthorByIdRepository(id);
};

export const createAuthorService = async ( name ) => {

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
    const error = new Error('No puede eliminar un autor asignado a un libro existente');
    error.status = 409;
    throw error;
  };

  await deleteAuthorRepository(id);

  return true;
};

