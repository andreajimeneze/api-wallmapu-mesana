export const paginationResponseDTO =
  ({ pages, items, next = 'none', prev = 'none', result = [] }) => {

    return {
      pages,
      items,
      next,
      prev,
      result
    };
  };
