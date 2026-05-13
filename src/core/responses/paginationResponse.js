export const paginationResponseDTO =
  ({ page, pages, items, next = 'none', prev = 'none', data = [] }) => {

    return {
      page,
      pages,
      items,
      next,
      prev,
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

// export const reservationPaginationRequestDTO = ({ page, pages, items, search, id_author, id_editorial, id_genre}) => {
//   return {
//     page, 
//     pages, 
//     items, 
//     search, 
//     id_status
//   };
// };