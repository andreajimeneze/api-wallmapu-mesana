import { normalizePagination } from '../helpers/pagination/nomalizePagination.js';
import { paginationUrl } from "../helpers/pagination/paginationUrl.js";
import { emptyPaginationDTO, paginationRequestDTO, paginationResponseDTO } from "../responses/paginationResponse.js";

export const getAllPaginationService = async(params, repository, dto) => {

  const { page, limit, search, filter } = paginationRequestDTO(params);
  
  const { page: normalizedPage, limit: normalizedLimit } = normalizePagination(page, limit);

  const { count: items, rows: result } = await repository({page: normalizedPage, limit: normalizedLimit, search, filter: filter || {}});

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
      response: "Datos obtenidos exitosamente",
      data: paginationResponseDTO({
        page: currentPage,
        pages,
        items,
        urlResponse,
        data: result.map(dto),
      }),
    };
  };