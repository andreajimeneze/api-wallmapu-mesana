export const paginationResponseDTO =
  ({ page, pages, items, next = 'none', prev = 'none', result = [] }) => {

    return {
      page,
      pages,
      items,
      next,
      prev,
      result
    };
  };

export const bookPaginationRequestDTO = ({ page, pages, items, search, id_author, id_editorial, id_genre}) => {
  return {
    page, 
    pages, 
    items, 
    search, 
    id_author, 
    id_editorial, 
    id_genre
  };
};