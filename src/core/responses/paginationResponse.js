export const paginationResponseDTO =
  ({ page, pages, items, urlResponse, data = [] }) => {

    return {
      page,
      pages,
      items,
      next: urlResponse?.next ?? null,
      prev: urlResponse?.prev ?? null,
      data
    };
  };

export const paginationRequestDTO = ({
  page,
  limit,
  search,
  filter
}) => {
  return {
    page: Number.isInteger(Number(page)) ? Number(page) : 1,
    limit: Number.isInteger(Number(limit)) ? Number(limit) : 10,
    search: search?.trim() || null,
    filter: filter || null
  };
};

export const emptyPaginationDTO =  ({ page, pages, items, next, prev, data }) => {

    return {
      page: 0,
      pages: 0,
      items: 0,
      next: 'None',
      prev: 'None',
      data: []
    };
  };
