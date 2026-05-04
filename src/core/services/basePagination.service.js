import { paginationResponseDTO } from "../responses/paginationResponse.js";
import { normalizePagination } from '../helpers/nomalizePagination.js';
import { buildSearchWhere } from "../helpers/paginationSearch.js";
import { calculatePagination } from "../helpers/calculatePagintation.js";
import { paginationUrl } from "../helpers/paginationUrl.js";
import { emptyPaginationDTO } from "../responses/paginationResponse.js";

export const createPaginationService = ({
  model,
  searchFields = [],
  includes = [],
  dtoMapper,
  idField,
  customWhere = {},
  entityName = "Registros"
}) => {

  return async ({ page, limit, search }) => {

    const { page: currentPage, limit: currentLimit } =
      normalizePagination(page, limit);

    const where = {
      ...customWhere,
      ...buildSearchWhere(search, searchFields)
    };

    const items = await model.count({
      where,
      distinct: true,
      col: idField,
    });

    if (items === 0) {
      return emptyPagination(entityName);
    }

    const { page: safePage, pages, offset } =
      calculatePagination(items, currentPage, currentLimit);

    const result = await model.findAll({
      where,
      include: includes,
      limit: currentLimit,
      offset,
      order: [["updated_at", "DESC"]],
      subQuery: false,
      distinct: true
    });

    const links = paginationUrl(
      basePath,
      safePage,
      pages,
      currentLimit,
      search
    );

    return {
      response: `${entityName} obtenidos exitosamente`,
      data: paginationResponseDTO({
        page: safePage,
        pages,
        items,
        ...links,
        data: result.map(dtoMapper)
      })
    };
  };
};