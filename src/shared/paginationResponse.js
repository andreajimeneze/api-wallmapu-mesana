export const paginationResponseDTO =
  ({ items, pages, next = 'none', prev = 'none', result = [] }) => {

    return {
      items,
      pages,
      next,
      prev,
      result
    };
  };
