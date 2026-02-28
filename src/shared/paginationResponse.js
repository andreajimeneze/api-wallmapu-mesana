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
